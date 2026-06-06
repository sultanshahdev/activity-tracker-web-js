import DatabaseHandler from './DatabaseHandler.js';
import ActivityBuilder from './ActivityBuilder.js';
import ActivityTypeToLogTypeMap from './ActivityTypeToLogTypeMap.js';
import readline from 'readline';

class ApplicationManager
{
    #databaseHandler=null;
    #activityDataset=[];
    #currentActivityLogs=[];
    #rl=null;
    activityBuilder = null;
    constructor()
    {
        this.#rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.initializeDatabaseConnection();
        this.initializeActivityBuilder();
    }

    async init()
    {
        try {
            console.log("Initializing Activity Tracker...");
            await this.#databaseHandler.initialize();
            await this.fetchAllActivitiesFromDatabase();
            this.displayActivities();
            await this.checkForInputAndPerformQuery();
        } catch(error) {
            console.error("Error during initialization:", error.message);
            this.#rl.close();
        }
    }
    initializeActivityBuilder()
    {
        this.activityBuilder = new ActivityBuilder();
    }
    initializeDatabaseConnection() 
    {
        this.#databaseHandler = new DatabaseHandler();
    }
    async fetchAllActivitiesFromDatabase()
    {
        await this.#databaseHandler.fetchAllActivities();
        let activities = this.#databaseHandler.getResult();
        activities.forEach((activity) => this.createAndAddActivity(activity));
    }
    displayActivities()
    {
        if(this.#activityDataset.length > 0) {
            console.log("\n========== Activities ==========");
            this.emptyLogsDataset();
            this.#activityDataset.forEach((activity) => this.createAndAddLogsToLogArray(activity));
            this.#currentActivityLogs.forEach((activityLog) => this.logActivity(activityLog));
        } else {
            console.log("\n========== No activities found ==========");
        }
    }
    logActivity(activityLog)
    {
        console.log(activityLog.logMsg);
    }
    createAndAddLogsToLogArray(activity)
    {
        let activityType = ActivityTypeToLogTypeMap[activity.activityType];
        let activityLog  = new activityType(activity); 
        this.#currentActivityLogs.push(activityLog);
    }

    #promptUser(question)
    {
        return new Promise((resolve) => {
            this.#rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }
    
    async checkForInputAndPerformQuery()
    {
        let userPrompt = null;
        do{
            userPrompt = await this.#promptUser(">>> QUERY [TOTAL-TIME] [BETWEEN (start date) (end date)] [ACTIVITY (activity type)] or QUIT\n>>> ");
            if(userPrompt.toUpperCase() === 'QUIT') break;
            await this.entertainPrompt(userPrompt);
        }
        while(true);
        this.#rl.close();
    }
    async entertainPrompt(promptMsg)
    {
        let parts = promptMsg.split(' ');
        if(parts[0].toUpperCase()==='TOTAL-TIME')
        {
            await this.fetchAllActivitiesFromDatabase();
            this.displayActivities();
            let totalDuration = this.calculateTotalTime();
            console.log(`>>> Querying total activity time:\n>>> ${totalDuration}`);
        }
        else if(parts[0].toUpperCase()==='BETWEEN')
        {
            let startDateStr = await this.#promptUser("Enter Starting Date (YYYY-MM-DD): ");
            let endDateStr   = await this.#promptUser("Enter Ending Date (YYYY-MM-DD): ");
            let startDate = new Date(startDateStr);
            let endDate   = new Date(endDateStr);
            await this.fetchBetweenTimeActivities({startDate,endDate});
            this.displayActivities();
        }
        else if(parts[0].toUpperCase()==='ACTIVITY')
        {
            // Capitalize first letter only (Cycling, Running, Walking, Swimming)
            let rawType = parts[1];
            if(!rawType) {
                console.log(">>> Please specify an activity type: ACTIVITY CYCLING|RUNNING|WALKING|SWIMMING");
                return;
            }
            let activityType = rawType.charAt(0).toUpperCase() + rawType.slice(1).toLowerCase();
            await this.fetchActivityOfType(activityType);
            console.log(`>>> Querying activities of type ${activityType.toUpperCase()}`);
            this.displayActivities();
        }
    }
    async fetchBetweenTimeActivities(time)
    {
        this.emptyDataset();
        await this.#databaseHandler.fetchActivitiesBetweenDate(time);
        let result = this.#databaseHandler.getResult();
        result.forEach((activity) => this.createAndAddActivity(activity));

    }
    async fetchActivityOfType(activityType)
    {
        this.emptyDataset();
        await this.#databaseHandler.fetchActivityOfType(activityType);
        let result = this.#databaseHandler.getResult();
        result.forEach((activity) => this.createAndAddActivity(activity));
    }
    emptyDataset()
    {
        this.#activityDataset = [];
    }
    emptyLogsDataset()
    {
        this.#currentActivityLogs=[];
    }
    
 
    createAndAddActivity(tempActivityFromDatabase)
    {
        this.activityBuilder.setActivity(tempActivityFromDatabase);
        let builtActivity = this.activityBuilder.createActivity();
        this.#activityDataset.push(builtActivity);
    }

    calculateTotalTime()
    {
        let totalMinutes = 0;
        this.#activityDataset.forEach((activity) => {
            totalMinutes += activity.duration.minutes + (activity.duration.hours * 60);
        });
        let hours = Math.floor(totalMinutes / 60);
        let minutes = totalMinutes % 60;
        return `${hours} hours and ${minutes} minutes`;
    }


    
}

export default ApplicationManager;