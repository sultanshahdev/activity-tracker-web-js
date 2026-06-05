class ActivityLogger
{
    logMsg = null;
    constructor(activity)
    {
        this.activity= activity;
        createGenericActivityFormat;
    }

    set createGenericActivityFormal()
    {
        this.logMsg=
        `
        [${date.toString()}] ${activity.activityType}: ${activity.name} at ${activity.location}
             duration: ${activity.duration.toLocaleString()}      
        `;
    }
}