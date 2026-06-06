class SwimmingActivityLogger extends OfflandActivityLogger()
{
    constructor(swimmingActivity)
    {
        super(swimmingActivity)
        this.swimmingActivityLog()
    }
    swimmingActivityLog()
    {
        this.logMsg+=
        `
        average pace : ${activity.averagePace}
        `
    }
} 