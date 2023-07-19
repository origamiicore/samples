import { OriProps,IOriModel,OriModel } from "origamicore"; 
@OriModel()
export default class UserModel extends IOriModel
{
    _id:string
    @OriProps({isRequired:true,})
    username:string;
    @OriProps({isRequired:true})
    password:string; 

    @OriProps({tags:'adminOnly'})
    wrongCount:number; 
    constructor(
        fields?: {
            _id?:string
            username?: string
            password?: string 
        })
    {
        super();  
        if (fields) 
        {
            Object.assign(this, fields); 
        }
    }
}