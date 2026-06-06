import ActivityLogger from './ActivityLogger.js';

class LandActivityLogger extends ActivityLogger
{
    constructor(landActivity)
    {
        super(landActivity);
        this.landActivityLogMsg();
    }
    landActivityLogMsg()
    {
        this.logMsg +=
        `
            distance : ${this.activity.distance}km
            elev     : ${this.activity.elevation}m
        `;
    }
}

export default LandActivityLogger;