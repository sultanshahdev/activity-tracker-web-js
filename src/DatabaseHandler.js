import {MongoClient} from "mongodb";
import dotenv from "dotenv"
dotenv.config();

class DatabaseHandler
{
    constructor()
    {
        createClientObject();
        connectToDataBase();
    
    }

    async createClientObject()
    {
        this.client = new MongoClient(process.env.DATABASE_URI)
        
        return client;
    }
    async connectToDatabase()
    {
        try
        {
            await this.client.connect();
        }
        catch(e)
        {
            console.error(e);
        }
    }

    async fetchAllActivities()
    {
        this.result = await client.db('activites_db').collection('activities').find({});
    }

    async fetchActivitiesBetweenDate({startDate, endDate})
    {
        this.result = await client.db('activities_db').collection('activities').findMany({date:{$gte:startDate},$lte:endDate})
    }
    async fetchActivityOfType(type)
    {
        this.result = await client.db('activities_db').collection('activites').findMany({activityType:type});
    }
}
