import LandActivityLogger from './LandActivityLogger.js';

class WalkingActivityLogger extends LandActivityLogger
{
    constructor(walkingActivity)
    {
        super(walkingActivity);
        this.walkingActivityLog();
    }
    walkingActivityLog()
    {
        this.logMsg +=
        `
            average pace : ${this.activity.averagePace} min/km
        `;
    }
}

export default WalkingActivityLogger;