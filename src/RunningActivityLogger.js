class RunningActivityLogger extends LandActivityLogger()
{
    constructor(runningActivity)
    {
        super(runningActivity)
        this.runningActivityLog()
    }
    runningActivityLog()
    {
        this.logMsg+=
        `
        average pace : ${activity.averagePace}
        `
    }
} 