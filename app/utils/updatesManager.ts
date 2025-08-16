import { promises as fs } from "fs"; 
import * as fsSync from 'fs';
import unzipper from "unzipper";
import path from "path";
import { dialog } from "electron"
import { getVersionFolderPath ,setVersionFolderPath ,getLocalVersion , setLocalVersion } from './userConfigHandler'
import axios from 'axios'
import dotenv from 'dotenv'
import { spawn } from 'child_process';

dotenv.config({path:'../.env'})

type onlineEstineaVersionInfo = {
    versionNumber: number,
    versionDownloadLink: string
}

async function versionFolderExists()
{
    if(await getVersionFolderPath() === '')
    {
        return false;
    }
    else
    {
        return true;
    }
}

function getPathForVersionFolderUsingWindowsDialog():string
{
    const result = dialog.showOpenDialogSync({
        properties: ['openDirectory']
    });
    if(result)
    {
    return result[0];
    }
    else{
        throw {message:"you didn't enter a path"}
    }
}

async function createVersionFolderInPath(versionFolderPath:string)
{
    try
    {
    await fs.mkdir(path.join(versionFolderPath,'Estinea versions folder'),{recursive:true})
    await fs.mkdir(path.join(versionFolderPath,'Estinea versions folder','online versions config file'),{recursive:true})
    await fs.mkdir(path.join(versionFolderPath,'Estinea versions folder','versions logs'),{recursive:true})
    await setVersionFolderPath(path.join(versionFolderPath,'Estinea versions folder'))
    }
    catch(error:any)
    {
        throw {message:`an unexpected error happened , error code : ${error.code}`}
    }
}

async function getNewestVersionAvailable():Promise<onlineEstineaVersionInfo>
{
    const onlineVersionFileID = '1seNJWNZ0Fg3z8Vl0LEHoW33cWJ2zGNKc'
    const url = `https://drive.google.com/uc?export=download&id=${onlineVersionFileID}`;
    
    try {
        const res = await axios.get(url);
        const version = res.data?.latestVersion
        const onlineVersionInfo:onlineEstineaVersionInfo={versionNumber:version.versionQuantifier,versionDownloadLink:version.versionDownloadLink}
        return onlineVersionInfo;
    } catch (err:any) {
        console.error("Error fetching JSON:", err.message);
        console.error(err.code)
        throw {message:`an unexpected error occured , error code : ${err.code}`}
    }
}

function inNeedOfANewVersion(localVersion:number,onlineVersion:number)
{
    if(localVersion<onlineVersion)
    {
        return true;
    }
    else
    {
        return false;
    }
}

async function downloadNewVersion(downloadLink:string,outputPath:string,onProgress: (progress: {
    progressPercentage:number,
    totalBytes:number,
    downloadedBytes:number,
    bytesPerSecondSpeed:number,
    etaSeconds:number
}) => void)
{
    try {
        const writer = fsSync.createWriteStream(outputPath);
        const res = await axios.get(downloadLink, { responseType: 'stream' });

        const totalLength = parseInt(res.headers['content-length'] || '0', 10);
        let downloaded = 0;
        let lastTime = Date.now();
        let lastDownloaded = 0;

        res.data.on('data', (chunk: Buffer) => {
            downloaded += chunk.length;

            const now = Date.now();
            const elapsedMs = now - lastTime;

            if (elapsedMs >= 1000) { // update every 1s
                const bytesInLastSecond = downloaded - lastDownloaded;
                const speedBps = bytesInLastSecond; // bytes/sec
                const remainingBytes = totalLength - downloaded;
                const etaSeconds = speedBps > 0 ? remainingBytes / speedBps : 0;

                onProgress({
                    progressPercentage : totalLength ? (downloaded / totalLength) * 100 : 0,
                    totalBytes: totalLength,
                    downloadedBytes: downloaded,
                    bytesPerSecondSpeed : speedBps,
                    etaSeconds : etaSeconds
                });

                lastTime = now;
                lastDownloaded = downloaded;
            }
        });

        res.data.pipe(writer);

        return new Promise<void>((resolve, reject) => {
            writer.on('finish', () => resolve());
            writer.on('error', reject);
        });
    } catch (err:any) {
        throw{message:`an unexpected error occured , error code : ${err.code}`}
    }
}

async function unzipNewVersion(inputPath:string,outputPath:string){
    fsSync.mkdirSync(outputPath, { recursive: true });

    return new Promise((resolve, reject) => {
        fsSync.createReadStream(inputPath)
            .pipe(unzipper.Extract({ path: outputPath }))
            .on('close', resolve)
            .on('error', reject);
    });
}

function deleteOldVersion()
{
    
}

async function launchGame(){
    //"C:\Estinea versions folder\Estinea\Estinea 0.0\Stardew Valley\Stardew Valley.exe"
    const exePath = path.join(await getVersionFolderPath(),`Estinea`,'Estinea 0.0','Stardew Valley','Stardew Valley.exe')

    const child = spawn(exePath, [], { detached: true , stdio: 'ignore' });

    child.on('error', (err) => {
        console.error("Failed to start game:", err);
    });

    child.on('close', (code) => {
        console.log(`Game exited with code ${code}`);
    });

    child.unref()
}

export async function needsUpdates():Promise<boolean>
{
    if(!await versionFolderExists())
    {
        const versionFolderPath = getPathForVersionFolderUsingWindowsDialog()
        await createVersionFolderInPath(versionFolderPath)
    }
    const newestVersionAvailable = await getNewestVersionAvailable();
    const localVersion = await getLocalVersion();
    const result = inNeedOfANewVersion(localVersion,newestVersionAvailable.versionNumber);
    console.log(result)
    return result;
}

export async function update(onProgress: (progress: {
    progressPercentage:number,
    totalBytes:number,
    downloadedBytes:number,
    bytesPerSecondSpeed:number,
    etaSeconds:number
}) => void)
{
    const newestVersionAvailable = await getNewestVersionAvailable();
    const versionFilePath = path.join(await getVersionFolderPath(),`Estinea.zip`)
    const versionFolderPath = path.join(await getVersionFolderPath(),`Estinea`)
    await downloadNewVersion(newestVersionAvailable.versionDownloadLink,versionFilePath,onProgress);
    await unzipNewVersion(versionFilePath,versionFolderPath)
}

export async function launch()
{
    await launchGame(); 
    return 'close'
}