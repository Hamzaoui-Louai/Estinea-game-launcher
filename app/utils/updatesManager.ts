import { promises as fs } from "fs"; 
import path from "path";
import { dialog } from "electron"
import { getVersionFolderPath ,setVersionFolderPath ,getLocalVersion , setLocalVersion } from './userConfigHandler'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({path:'../.env'})

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

async function getNewestVersionAvailable()
{
    const onlineVersionFileID = '1seNJWNZ0Fg3z8Vl0LEHoW33cWJ2zGNKc'
    const url = `https://www.googleapis.com/drive/v3/files/${onlineVersionFileID}?alt=media&key=${process.env.GOOGLE_API_KEY}`;
    
    try {
        const res = await axios.get(url);
        console.log(res.data)
    } catch (err:any) {
        console.error("Error fetching JSON:", err.message);
        return null;
    }
}

function downloadNewVersion()
{

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
    await getNewestVersionAvailable()

}