class TotalTimeQuery extends Query
{
    constructor(activityDataSet)
    {
        super(activityDataSet);
        performQuery();
    }
    performQuery()
    {
        activityDataSet.forEach(activity,addActivityToResultSet(activity));
    }
    addActivityLogToResultSet(activity)
    {
        currentActivityLogType = ActivityTypeToLogTypeMap[activity.activityType];
        activityLog = new currentActivityLogType(activity);
        this.resultSet.addRecord(activityLog.logMsg);
    }

} 