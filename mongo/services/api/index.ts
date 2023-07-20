import { DataInput, ModuleConfig, OriInjectable, OriService, PackageIndex, SessionInput } from "origamicore";
import ApiConfig from "./models/apiConfig";
import UserModel from './models/userModel';
import Database from "../common/database";
import ProfileModel from "./models/profile";
import { SelectModel } from "tsorimongo";

@OriInjectable({domain:'api'})
export default class ApiService implements PackageIndex
{
    name:string='api';
    config:ApiConfig;
    jsonConfig(moduleConfig: ModuleConfig): Promise<void> { 
        this.config=moduleConfig as ApiConfig;
        Database.init(this.config.dbContext);
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
    async insertProfile()
    {
        await Database.profile.InsertOne(new ProfileModel({firstName:'Vahid',lastName:'ssaini',username:'vahidhossaini',weight:73 }));
        await Database.profile.saveById(new ProfileModel({firstName:'Dwayne',lastName:'Johnson',username:'dwaynejohnson',weight:118}));
        await Database.profile.InsertMany([
            new ProfileModel({firstName:'Vin',lastName:'Diesel',username:'vindiesel',weight:102}),
            new ProfileModel({firstName:'Will',lastName:'Smith',username:'willsmith',weight:82}),
            new ProfileModel({firstName:'Chris',lastName:'Hemsworth',username:'chrishemsworth',weight:91}),
            new ProfileModel({firstName:'Leonardo',lastName:'DiCaprio',username:'leonardodiCaprio',weight:85}),
        ]);
    }
    @OriService({isPublic:true})
    async updateProfile()
    {
        //we increase the weight and change the lastname of the documnet whose  firstname is Vahid
        // and we add pen to purchases array
        await Database.profile.UpdateOne(
            //condition
            {firstName:'Vahid'},
            //new changes
            {set:{lastName:'Hossaini'},inc:{weight:1},push:{purchases:'pen'}})
        
        await Database.profile.UpdateMany(
            //condition
            {weight:{$gt:90}},
            //new changes
            {inc:{weight:1}})

        await Database.profile.findByIdAndUpdate(
            //_id
            'dwaynejohnson',
            //new changes
            {push:{purchases:'pen'}})
    }

    @OriService({isPublic:true})
    async searchProfile()
    {
        console.log('1',await Database.profile.findById('dwaynejohnson'));
        console.log('2',await Database.profile.search().findOne());
        console.log('3',await Database.profile.search().find());
        console.log('4',await Database.profile.search({select:['username','firstName']}).find());
        console.log('5',await Database.profile.search().select(['username','firstName']).find());
        console.log('6',await Database.profile.search({limit:3}).find());
        console.log('7',await Database.profile.search().limit(3).find());
        console.log('8',await Database.profile.search({skip:2}).find());
        console.log('9',await Database.profile.search().skip(2).find());
        console.log('10',await Database.profile.search({skip:2,showCount:true}).find());
        console.log('11',await Database.profile.search().skip(2).count(true).find());
        console.log('12',await Database.profile.search({sort:[{name:'weight',type:'asc'}]}).find());
        console.log('13',await Database.profile.search().sort([{name:'weight',type:'asc'}]).find());
        console.log('14',await Database.profile.search({where:{weight:{$gt:90}}}).find());
        console.log('15',await Database.profile.search().where({weight:{$gt:90}}).find());
        console.log('16',await Database.profile.search({where:{firstName:{$eq:'Will'}}}).find());
        console.log('17',await Database.profile.search().where({firstName:{$eq:'Will'}}).find());
        console.log('18',await Database.profile.search().where({firstName:'Will'}).find());
        console.log('19',await Database.profile.search({where:{
            $or:[
                {firstName:'Will'},
                {firstName:'Leonardo'}
            ]
        }}).find());
        console.log('20',await Database.profile.search().where({firstName:'Will'}).whereOr({firstName:'Leonardo'}).find());
        
        console.log('21',await Database.profile.search({where:{
            $or:[
                {firstName:'Will'},
                {lastName:'Smith'}
            ]
        }}).find());
        console.log('22',await Database.profile.search().where({firstName:'Will'}).whereAnd({lastName:'Smith'}).find());
        console.log('23',await Database.profile.search().select(['isAvtive']).group([
            new SelectModel({func:'sum',name:'weight',title:'weightTitle'}),
            new SelectModel({func:'count',name:'weight',title:'weightCountTitle'})
        ]).find());
        
    }

    @OriService({isPublic:true})
    async deleteProfile()
    {
        await Database.profile.deleteOne({firstName:'Vahid'});
        await Database.profile.deleteMany({weight:{$gt:90}});
        await Database.profile.findByIdAndDelete('willsmith');
        await Database.profile.search().where({username:'leonardodiCaprio'}).findOneAndDelete();
    }
}