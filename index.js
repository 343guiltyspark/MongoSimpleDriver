const tunnel = require('tunnel-ssh');
const mongo = require('mongodb').MongoClient;


    const defineDb = (baseUrl,dataBase,connectionOptions) => {    
        this.baseUrl = baseUrl;
        this.dataBase = dataBase;
        this.connectionOptions = connectionOptions;
        //return this;
    }

    var connectTunnel = (config) => { 

        console.log(config);
        var config = config;
        var ssh = tunnel(config, async function(error, tnl){
            try {
                if(typeof config.debug != 'undefined') {
                console.log("Tunnel Connected")
                console.log(tnl);
                }
            } catch (error) {
                console.log(error)
            }
        });

    }

    const mongoFindOne = async (collection,query) =>{

        try{
            var db = await mongo.connect(this.baseUrl,this.connectionOptions);
            var data = await db.db(this.dataBase).collection(collection).findOne(query);
            
            return data 
        } catch {
            console.log(error);
        }
    }

    const mongoFind= async (collection,query) => {

        try {
            var db = await mongo.connect(this.baseUrl,this.connectionOptions);
            var data = await db.db(this.dataBase).collection(collection).find(query) ;
            data = data.toArray();
            
            return data
        } catch { 
            console.log(error);
        }
    }

    const mongoInsertOne = async (collection,query,options) => {
        
        try {
            var db = await mongo.connect(this.baseUrl,this.connectionOptions);
            var data = await db.db(this.dataBase).collection(collection).insertOne(query, options) ;
        
            return data 
        } catch {
            console.log(error);
        }
    }

    const mongoUpdate = async (collection,query,update,options) => {
        
        try{
            var db = await mongo.connect(this.baseUrl,this.connectionOptions);
            var data = await db.db(this.dataBase).collection(collection).updateOne(query,update,options) ;
        
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    //Note : collection().remove() has been depreciated as of Mongo 4.2 
    const mongoRemove = async (collection,query,update,options) => {
        
        try{
            var db = await mongo.connect(this.baseUrl,this.connectionOptions);
            var data = await db.db(this.dataBase).collection(collection).remove(query,update,options) ;
            
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
//list export methods
exports.defineDb = defineDb;
exports.connectTunnel= connectTunnel;
exports.mongoFind = mongoFind;
exports.mongoFindOne = mongoFindOne; 
exports.mongoInsertOne = mongoInsertOne;
exports.mongoUpdate = mongoUpdate; 
exports.mongoRemove = mongoRemove;




