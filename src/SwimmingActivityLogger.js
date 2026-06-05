class SwimmingActivityLogger extends OfflandActivityLogger()
{
    constructor(swimmingActivity)
    {
        super(swimmingActivity)
        swimmingActivityLog()
    }
    set swimmingActivityLog()
    {
        this.logMsg+=
        `
        average pace : ${activity.averagePace}
        `
    }
} 