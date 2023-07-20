export default class ProfileModel
{
    _id:string;
    username:string
    firstName:string;
    lastName:string;
    weight:number;
    isAvtive:boolean=true;
    purchases:string[]=[]
    constructor(data:{
        _id?:string;
        username:string
        firstName:string;
        lastName:string;
        weight:number;
        isAvtive?:boolean;
        purchases?:string[];
    }){
        Object.assign(this,data);
        if(!this._id)this._id=this.username;
    }
}