
import {ConfigModel} from "origamicore";  
import { AuthzEndpoint, ConnectionEventType, ConnectionProtocol, EndpointConfig, EndpointConnection, EndpointConnectionType, JwtConfig } from "tsoriendpoint";
import { BackupModel, DatabaseConnection, MongoConfig } from "tsorimongo";
import ApiConfig from "./services/api/models/apiConfig";
export default new ConfigModel({
    packageConfig:[
        new EndpointConfig({
            connections:[
                new EndpointConnection({
                    protocol:new ConnectionProtocol({
                        port:3000,
                        type:'http', 
                    }),
                    type:EndpointConnectionType.Express,  
                })
            ]
        }),
        
        new MongoConfig({
            connections:[
                new DatabaseConnection({
                    name:'default',//databse context
                    database:'shop',//database name
                    // //optional
                    // host:'192.168.1.1',//default : localhost
                    // //if we want to backup databse
                    // //if the table is not set , all the tables will be backed up
                    // backup:new BackupModel({path:'/tmp/backup',secPeriod:60*60*24,tables:'profiles,accounts'}),//1 day
                    // username:'adminuser',//if database must have a username
                    // password:'database password',//if database must have a password
                    // port:233,//default : 27017

                }),
            ]
         }),
         new ApiConfig({dbContext:'default'})
         
    ]
});