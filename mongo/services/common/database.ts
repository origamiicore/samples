import { MongoRouter } from "tsorimongo";
import ProfileModel from "../api/models/profile";

export default class Database
{ 
    static profile:MongoRouter<ProfileModel>;   
    static init(dbcontext:string)
    {
        this.profile=new MongoRouter(dbcontext,'profile',ProfileModel) ;
    }
}