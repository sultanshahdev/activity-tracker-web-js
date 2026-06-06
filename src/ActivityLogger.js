import { durationToString } from './DurationUtils.js';

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
        const durationStr = typeof this.activity.duration === 'string' 
            ? this.activity.duration 
            : durationToString(this.activity.duration);
        
        this.logMsg=
        `
        [${this.activity.date.toString()}] ${this.activity.activityType}: ${this.activity.name} at ${this.activity.location}
             duration: ${durationStr}      
        `;
    }
}

export default ActivityLogger;