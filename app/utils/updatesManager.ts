import { promises as fs } from "fs"; 
import * as fsSync from 'fs';
import path from "path";
import { dialog } from "electron"
import { getVersionFolderPath ,setVersionFolderPath ,getLocalVersion , setLocalVersion } from './userConfigHandler'
import axios from 'axios'
import dotenv from 'dotenv'

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

async function downloadNewVersion(downloadLink:string,outputPath:string)
{
    try{
        const writer = fsSync.createWriteStream(outputPath);

        const res = await axios.get(downloadLink,{
            responseType: 'stream'
        });

        const totalLength = parseInt(res.headers['content-length'] || '0', 10);
        let downloaded = 0;

        res.data.on('data', (chunk: Buffer) => {
            downloaded += chunk.length;
            if (totalLength) {
                const percent = ((downloaded / totalLength) * 100).toFixed(2);
                process.stdout.write(`\rDownloaded: ${percent}%`);
            } else {
                process.stdout.write(`\rDownloaded: ${downloaded} bytes`);
            }
        });

        res.data.pipe(writer);

        return new Promise<void>((resolve, reject) => {
            writer.on('finish', () => {
                console.log('\nDownload complete');
                resolve();
            });
            writer.on('error', reject);
        });
    }
    catch(err:any)
    {
        //console.log(err);
    }
}

function deleteOldVersion()
{
    
}

export async function update()
{
    if(!await versionFolderExists())
    {
        const versionFolderPath = getPathForVersionFolderUsingWindowsDialog()
        await createVersionFolderInPath(versionFolderPath)
    }
    const newestVersionAvailable = await getNewestVersionAvailable();
    console.log(newestVersionAvailable)
    const localVersion = await getLocalVersion();
    const versionFolderPath = path.join(await getVersionFolderPath(),`Estinea ${newestVersionAvailable.versionNumber.toFixed(1)}.zip`)
    if(inNeedOfANewVersion(localVersion,newestVersionAvailable.versionNumber))
    {
        await downloadNewVersion(newestVersionAvailable.versionDownloadLink,versionFolderPath);
    }
    else
    {
        console.log("no update needed");
    }

}