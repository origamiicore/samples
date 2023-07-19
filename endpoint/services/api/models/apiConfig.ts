import { ModuleConfig, PackageIndex } from "origamicore";
import ApiService from "..";
export default class ApiConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance=new ApiService();
        await instance.jsonConfig(this);
        return instance;
    }
    dbContext:string;
    public constructor(
        
        fields?: {
            id?:string
            name?: string, 
            dbContext?:string  
        }) {

        super(fields);
        if (fields) Object.assign(this, fields);
    }
}