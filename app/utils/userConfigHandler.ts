import { promises as fs } from "fs";
import path from 'path';

type windowsDiskPath = 'C:\\' | 'D:\\' | 'E:\\' | 'F:\\' | 'G:\\' | 'H:\\'
type userConfigError = {
    message: string;
}

async function userConfigExistsOnDisk(disk:windowsDiskPath){
    try {
        await fs.access(path.join(disk,'Estinea User Config','config.json'));
        return true;
    } catch {
        return false;
    }
}

async function userConfigExists()
{
    if(await userConfigExistsOnDisk('C:\\')||
    await userConfigExistsOnDisk('D:\\')||
    await userConfigExistsOnDisk('E:\\')||
    await userConfigExistsOnDisk('F:\\')||
    await userConfigExistsOnDisk('G:\\')||
    await userConfigExistsOnDisk('H:\\'))
    {
        return true;
    }
    else{
        return false;
    }
}

async function createUserConfigInDisk(disk:windowsDiskPath)
{
    try{
        await fs.mkdir(path.join(disk,'Estinea User Config'),{ recursive: true })
        await fs.writeFile(path.join(disk,'Estinea User Config','config.json'),'{}','utf-8')
    }
    catch(error:any){
        switch(error.code)
        {
            case 'EACCESS':
                throw {message:`don't have the permission to create the config in disk ${disk}`}
                break;
            case 'EPERM':
                throw {message:`don't have the permission to create the config in disk ${disk}`}
                break;
            case 'EROFS':
                throw {message:`the disk ${disk} has a read-only file system`}
                break;
            case 'ENOSPC':
                throw {message:`the disk ${disk} has no space left`}
                break;
            default :
                throw {message:`an unexpected error happened when trying to create the config in disk ${disk} ; Error code : ${error.code}`}
        }
    }
}

async function createUserConfig() {
    let errorsList:userConfigError[] = []
    try{
        await createUserConfigInDisk('C:\\')
    }
    catch(error:any)
    {
        errorsList.push(error)
        try{
            await createUserConfigInDisk('D:\\')
        }
        catch(error:any)
        {
            errorsList.push(error)
            try{
                await createUserConfigInDisk('E:\\')
            }
            catch(error:any)
            {
                errorsList.push(error)
                try{
                    await createUserConfigInDisk('F:\\')
                }
                catch(error:any)
                {
                    errorsList.push(error)
                    try{
                        await createUserConfigInDisk('G:\\')
                    }
                    catch(error:any)
                    {
                        errorsList.push(error)
                        try{
                            await createUserConfigInDisk('H:\\')
                        }
                        catch(error:any)
                        {
                            errorsList.push(error)
                            throw {errors:errorsList}
                        }
                    }
                }
            }
        }
    }
}

async function findUserConfigPath():Promise<string> {
    let configPath:string = 'none'
    if(await userConfigExistsOnDisk('C:\\'))
    {
        configPath = path.join('C:\\','Estinea User Config','config.json')
    }
    if(await userConfigExistsOnDisk('D:\\'))
    {
        configPath = path.join('D:\\','Estinea User Config','config.json')
    }
    if(await userConfigExistsOnDisk('E:\\'))
    {
        configPath = path.join('E:\\','Estinea User Config','config.json')
    }
    if(await userConfigExistsOnDisk('F:\\'))
    {
        configPath = path.join('F:\\','Estinea User Config','config.json')
    }
    if(await userConfigExistsOnDisk('G:\\'))
    {
        configPath = path.join('G:\\','Estinea User Config','config.json')
    }
    if(await userConfigExistsOnDisk('H:\\'))
    {
        configPath = path.join('H:\\','Estinea User Config','config.json')
    }
    return configPath;
}

async function writeNewDataToUserConfig(data:any)
{
    try
    {
        data = JSON.stringify(data)
        await fs.writeFile(await findUserConfigPath(),data,'utf-8')
        return {message:'data setted successfully'}
    }
    catch(error:any)
    {
        throw{message:`an unexpected error occured , error code : ${error.code} \nplease report to us in case this happens`}
    }
}

async function readUserConfig() {
    let data:any
    try {
        data = JSON.parse(await fs.readFile(await findUserConfigPath(), 'utf-8'))
        return data;
    }
    catch(error:any)
    {
        throw{message:`an unexpected error occured , error code : ${error.code} \nplease report to us in case this happens`}
    }
}

function wrapValue(value:any)
{
    try{
        return {isError:false,data:value}
    }
    catch(error)
    {
        return {isError:true,data:error}
    }
}

export async function modifyUserConfig(action:modifyUserConfigAction,data:any){
    try{
        if(!await userConfigExists())
        {
            await createUserConfig();
        }
        if(action == 'set')
        {
            return wrapValue(await writeNewDataToUserConfig(data));
        }
        if(action == 'get')
        {
            return wrapValue(await readUserConfig());
        }
    }
    catch(error){
        return wrapValue(error);
    }
}

//for axios 

export async function getTokenFromUserConfig(){
    try{
    if(!await userConfigExists())
    {
        await createUserConfig();
    }
    const userConfigData = await readUserConfig()
    const token = userConfigData?.token;
    return token;
    }
    catch (error){
        console.log(error)
    }
}

//for versions folder

export async function getVersionFolderPath(){
    try{
        if(!await userConfigExists())
        {
            await createUserConfig();
        }
        const userConfigData = await readUserConfig()
        return userConfigData.versionFolderPath || ''
    }
    catch (error){
        console.log(error)
    }
}

export async function setVersionFolderPath(path:string){
    try{
        if(!await userConfigExists())
        {
            await createUserConfig();
        }
        const userConfigData = await readUserConfig()
        userConfigData.versionFolderPath=path
        await writeNewDataToUserConfig(userConfigData);
    }
    catch (error){
        console.log(error)
    }
}