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
    hello(name:string)
    {
      return 'Hello '+name
    }

    @OriService({})
    isLogin()
    { 
        return true;
    }
    @OriService({isPublic:true})
    login(username:string)
    { 
        return new RouteResponse({ 
            session:{userid:username}
        })
    }
    
    @OriService({})
    profile(@SessionInput session)
    { 
        return session;
    }
    @OriService({service:'inbox',isPublic:true})
    getMyInbox()
    {
        return []
    }

    @OriService({isPublic:true,route:'hi/:name'})
    sayHi(name:string)
    {
        return 'Hi '+name
    }

    @OriService({isPublic:true,method:HttpMethod.Get})
    getAddress()
    {
        return 'Address : '
    }

    @OriService({isPublic:true,maxUploadSize:1024*1024*5})// 5 MB
    upload(file:UploadFileModel)
    {
        return file;
    }

    @OriService({isInternal:true})
    getPrivateInfo()
    {
        return {name:'Hello World',secretKey:'1234567890'}
    }
    @OriService({isPublic:true})
    async getInfo()
    {
        let pv= await Router.runInternal('api','getPrivateInfo',new MessageModel({data:{}}));
        return pv.response.data.name;
    }


    @OriService({isPublic:true})
    async managerLogin(username:string)
    {
        return new RouteResponse({ 
            session:{userid:username,role:Roles.Manager}
        })
    }
    @OriService({roles:[Roles.Admin]})
    async adminCheck()
    {
        return true;
    }
    @OriService({roles:[Roles.Manager]})
    async managerCheck()
    {
        return true;
    }
}