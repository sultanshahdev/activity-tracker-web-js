import ActivityLogger from './ActivityLogger.js';

class OfflandActivityLogger extends ActivityLogger
{
    constructor(activity)
    {
        super(activity);
        this.offlandActivityLogMsg();
    }
    offlandActivityLogMsg()
    {
        this.logMsg +=
        `
        Laps Count : ${this.activity.lapsCount}
        Lap Length : ${this.activity.lapLength}
        `;
        
    }
}

export default OfflandActivityLogger;