import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

class DatabaseHandler
{
    #result = null;
    #isConnected = false;

    constructor()
    {
        this.createClientObject();
    }

    createClientObject()
    {
        const connectionString = process.env.DATABASE_URI || "mongodb://localhost:27017";
        this.client = new MongoClient(connectionString, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000
        });
        return this.client;
    }

    async initialize()
    {
        await this.connectToDatabase();
    }

    async connectToDatabase()
    {
        try
        {
            console.log("Connecting to MongoDB...");
            await this.client.connect();
            this.#isConnected = true;
            console.log("Connected to MongoDB successfully");
        }
        catch(e)
        {
            console.error("Failed to connect to MongoDB:", e.message);
            this.#isConnected = false;
        }
    }

    async fetchAllActivities()
    {
        if(!this.#isConnected) {
            console.log("Database not connected. Returning empty activities.");
            this.#result = [];
            return;
        }
        try {
            this.#result = await this.client.db('activities_db').collection('activities').find({}).toArray();
        } catch(e) {
            console.error("Error fetching activities:", e.message);
            this.#result = [];
        }
    }

    async fetchActivitiesBetweenDate({startDate, endDate})
    {
        if(!this.#isConnected) {
            console.log("Database not connected. Returning empty activities.");
            this.#result = [];
            return;
        }
        try {
            this.#result = await this.client.db('activities_db').collection('activities').find({date:{$gte:startDate,$lte:endDate}}).toArray();
        } catch(e) {
            console.error("Error fetching activities between dates:", e.message);
            this.#result = [];
        }
    }
    async fetchActivityOfType(type)
    {
        if(!this.#isConnected) {
            console.log("Database not connected. Returning empty activities.");
            this.#result = [];
            return;
        }
        try {
            this.#result = await this.client.db('activities_db').collection('activities').find({activityType:type}).toArray();
        } catch(e) {
            console.error("Error fetching activities by type:", e.message);
            this.#result = [];
        }
    }

    getResult()
    {
        return this.#result || [];
    }
}

export default DatabaseHandler;
