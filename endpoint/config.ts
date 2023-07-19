
import {ConfigModel} from "origamicore";  
import { AuthzEndpoint, ConnectionEventType, ConnectionProtocol, EndpointConfig, EndpointConnection, EndpointConnectionType, JwtConfig } from "tsoriendpoint";
import ApiConfig from "./services/api/models/apiConfig";
import fs from 'fs'
export default new ConfigModel({
    packageConfig:[
        new ApiConfig(),
        new EndpointConfig({
            connections:[
                new EndpointConnection({
                    protocol:new ConnectionProtocol({
                        port:3000,
                        type:'https',
                        socketProtocol:'echo-protocol',

                        crt:fs.readFileSync('security/cert.crt').toString(),
                        key:fs.readFileSync('security/cert.key').toString(),
                        jwtConfig:new JwtConfig({
                            algorithm:'RS256',
                            secExpireTime:60*60*3,//3day
                            privateKey:fs.readFileSync('security/jwtRS256.key') + '',
                            publicKey:fs.readFileSync('security/jwtRS256.key.pub') + '',
                       })
                    }),
                    cors:['*'],
                    type:EndpointConnectionType.Soucket, 
                    allowHeader:'Content-Type, X-Custom-Header',
                    authz:{domain:'newauthmodule',service:'checkRole'},
                    bindAddress:'192.168.1.120',
                    limit:{bodyLimit:1,urlLimit:1},
                    publicFolder:['public1','public2'],
                    events:[
                        {domain:'',service:'',type:ConnectionEventType.Open},
                        {domain:'',service:'',type:ConnectionEventType.Close},
                    ]

                })
            ]
            
        })
    ]
});