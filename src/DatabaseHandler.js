import {MongoClient} from "mongodb";
import dotenv from "dotenv"
dotenv.config();

class DatabaseHandler
{
    constructor()
    {
        this.client = createClientObject()
        
    
    }

    createClientObject()
    {
        const client = new MongoClient(process.env.DATABASE_URI)
        return client;
    }
    connectToDatabase()
    {
        try
        {
            this.client.connect();
        }
        catch(e)
        {
            console.error(e);
        }
    }

    async fetchAllActivities()
    {
        this.result = await client.db('activites_db').collection('activities').findMany({});
    }

    async fetchActivitiesBetweenDate({startDate:0, endDate: 0})
    {

    }
}
