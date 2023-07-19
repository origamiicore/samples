import { DataInput, HttpMethod, MessageModel, ModuleConfig, OriInjectable, OriService, PackageIndex, RouteResponse, Router, SessionInput } from "origamicore";
import ApiConfig from "./models/apiConfig";
import UserModel from './models/userModel';
import { UploadFileModel } from "tsoriendpoint";

class Roles
{
    static Admin:number=1;
    static Manager:number=2;
}

@OriInjectable({domain:'api'})
export default class ApiService implements PackageIndex
{
    name:string='api';
    config:ApiConfig;
    jsonConfig(moduleConfig: ModuleConfig): Promise<void> { 
        this.config=moduleConfig as ApiConfig;
        return ;
    }
    start(): Promise<void> {
        return;
    }
    restart(): Promise<void> {
        return;
    }
    stop(): Promise<void> {
        return;
    } 

    
    @OriService({isPublic:true})
    helloWorld()
    {
      return 'Hello World'
    }

    @OriService({isPublic:true})
    hello(name:string)
    {
      return 'Hello '+name
    }
 
}