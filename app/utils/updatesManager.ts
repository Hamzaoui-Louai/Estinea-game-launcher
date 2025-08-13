import { promises as fs } from "fs"; 
import path from "path";
import { dialog } from "electron"
import { getVersionFolderPath ,setVersionFolderPath } from './userConfigHandler'

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
    await fs.mkdir(path.join(versionFolderPath,'Estinea versions folder',),{recursive:true})
    }
    catch(error)
    {
        throw {message:`an unexpected error happened , error code : ${error.code}`}
    }
}

function checkForNewVersion()
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