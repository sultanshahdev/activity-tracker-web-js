import OfflandActivityLogger from './OfflandActivityLogger.js';

class SwimmingActivityLogger extends OfflandActivityLogger
{
    constructor(swimmingActivity)
    {
        super(swimmingActivity);
        this.swimmingActivityLog();
    }
    swimmingActivityLog()
    {
        this.logMsg+=
        `
        average pace : ${this.activity.averagePace}
        `;
    }
}

export default SwimmingActivityLogger;