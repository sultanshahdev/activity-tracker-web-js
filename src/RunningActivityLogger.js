import LandActivityLogger from './LandActivityLogger.js';

class RunningActivityLogger extends LandActivityLogger
{
    constructor(runningActivity)
    {
        super(runningActivity);
        this.runningActivityLog();
    }
    runningActivityLog()
    {
        this.logMsg+=
        `
        average pace : ${this.activity.averagePace} min/km
        `;
    }
}

export default RunningActivityLogger;