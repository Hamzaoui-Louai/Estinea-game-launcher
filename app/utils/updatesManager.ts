import { promises as fs } from "fs"; 
import path from "path";
import { dialog } from "electron"
import { getVersionFolderPath ,setVersionFolderPath } from './userConfigHandler'
import { getLocalVersion , setLocalVersion } from './userConfigHandler'

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
    catch(error)
    {
        throw {message:`an unexpected error happened , error code : ${error.code}`}
    }
}

function getNewestVersionAvailable()
{

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

}