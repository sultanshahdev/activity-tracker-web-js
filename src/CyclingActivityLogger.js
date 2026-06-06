import LandActivityLogger from './LandActivityLogger.js';

class CyclingActivityLogger extends LandActivityLogger
{
    constructor(cyclingActivity)
    {
        super(cyclingActivity);
        this.cyclingActivityLog();
    }
    cyclingActivityLog()
    {
        this.logMsg +=
        `
        average speed : ${this.activity.averageSpeed}km/h
        `;
    }
}

export default CyclingActivityLogger;