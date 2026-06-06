class ActivityType extends Query
{
    constructor(activityDataSet,activityType)
    {
        super(activityDataSet);
        this.activityType = activityType;
    }
    performQuery()
    {
        this.activityDataSet.forEach(activity,addActivityToResultSet(activity));
    }
    addActivityToResultSet(activity)
    {
        if(activity.activityType===this.activityType)
        {
            activityLogType = activityTypeToLogTypeMap[activity.activityType];
            activityLog     = new activityLogType(activity);
            resultSet.addRecord(activityLog.logMsg);
        }
    }
}