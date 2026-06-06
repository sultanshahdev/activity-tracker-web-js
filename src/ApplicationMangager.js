class ApplicationManager
{
    #databaseHandler=null;
    #activityDataset=[];
    #currentActivityLogs=[];
    activityBuilder = null;
    constructor()
    {
        this.initializeDatabaseConncetion();
        this.initializeActivityBuilder();
        this.fethcAllActivitiesFromDatabase();
        this.displayActivities();
        this.checkForInputAndPerformQuery();
    }
    initializeActivityBuilder()
    {
        this.activityBuilder = new ActivityBuilder();
    }
    initializeDatabaseConnection() 
    {
        this.databaseHandler = new DatabaseHandler();
    }
    fetchAllActivitiesFromDatabase()
    {
        this.databaseHandler.fetchAllActivities();
        let activities = database.getResult();
        activities.forEach(createAndAddActivity(activity));
    }
    displayActivites()
    {
        this.emptyLogsDataset();
        activityDataset.forEach(createAndAddLogsToLogArray(activity));
        currentActivityLogs.forEach(logActivity(activityLog));
    }
    logActivity(activityLog)
    {
        console.log(activityLog.logMsg);
    }
    createAndAddLogsToLogArray(activity)
    {
        let activityType = ActivityTypeToLogTypeMap[activity.activityName];
        let activityLog  = new activityType(activity); 
        this.currentActivityLogs.push(activityLog);
    }
    
    checkForInputAndPerformQuery()
    {
        let userPrompt = null;
        do{
            userPrompt = prompt(">>> QUERY [TOTAL-TIME] [BETWEEN (start date) (end date)] [ACTIVITY (activity type)]")
            entertainPrompt(promptMsg);
            
        
        }
        while(userPrompt!=='QUIT' || userPrompt!=="quit")
    }
    entertainPrompt(promptMsg)
    {
        if(promptMsg==='TOTAL-TIME')
        {
            fetchAllActivitiesFromDatabase();
            displayActivities();
        }
        else if(promptMsg==='BETWEEN')
        {
            let startDate = new Date(prompt("Enter Starting Date :"));
            let endDate   = new Date(prompt("Enter Ending   Date :"));
            this.fetchBetweenTimeActivities({startDate,endDate});
            this.displayActivities();
        }
        else if(promptMsg==='ACTIVITY-TYPE')
        {
            let activityType =prompt("Enter Activity Type:")
            this.fetchActivityOfType(activityType);
            this.displayActivities()
        }
    }
    fetchBetweenTimeActivities(time)
    {
        this.emptyDataset();
        databaseHandler.fetchActivitiesBetweenDate(time)
        let result = databaseHandler.getResult();
        result.forEach(createAndAddActivity(activity));

    }
    fetchActivityOfType(activityType)
    {
        this.emptyDataset()
        this.databaseHandler.fetchActivityOfType(activityType)
        let result = databaseHandler.getResult();
        result.forEach(createAndAddActivity(activity));
    }
    emptyDataset()
    {
        this.activityDataset = [];
    }
    emptyLogsDataset()
    {
        this.currentActivityLogs=[];
    }
    
 
    createAndAddActivity(tempActivityFromDatabase)
    {
        activityBuilder.setActivity(tempActivityFromDatabase);
        let builtActivity = activityBuilder.createActivity();
        this.activityDataset.push(builtActivity);
    }


    
}