
import {ConfigModel} from "origamicore";  
import { ConnectionProtocol, EndpointConfig, EndpointConnection, EndpointConnectionType, JwtConfig } from "tsoriendpoint";
import ApiConfig from "./services/api/models/apiConfig";
export default new ConfigModel({
    packageConfig:[
        new ApiConfig(),
        new EndpointConfig({
            connections:[
                new EndpointConnection({
                    //debug:true,
                    protocol:new ConnectionProtocol({
                        port:3000,
                        type:'http'
                    }),
                    cors:['*'],
                    type:EndpointConnectionType.Express
                })
            ]
            
        })
    ]
});