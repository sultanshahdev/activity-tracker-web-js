class RunningActivityLogger extends LandActivityLogger()
{
    constructor(runningActivity)
    {
        super(runningActivity)
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