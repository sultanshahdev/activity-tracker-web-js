class ActivityLogger
{
    logMsg = null;
    constructor(activity)
    {
        if (!activity) throw new Error("Activity is required");
        this.activity= activity;
        this.createGenericActivityFormat();
    }

    createGenericActivityFormat()
    {
        this.logMsg=
        `
        [${this.activity.date.toString()}] ${this.activity.activityType}: ${this.activity.name} at ${this.activity.location}
             duration: ${this.activity.duration.toString()}      
        `;
    }
}