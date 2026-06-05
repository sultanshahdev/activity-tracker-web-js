class CyclingActivityLoggger extends LandActivityLogger
{
    constructor(cyclingActivity)
    {
        super(cyclingActivity)
        CyclingActivityLog()
    }
    set CyclingActivityLog()
    {
        this.logMsg +=
        `
        average speed : ${activity.averageSpeed}km/h
        `;
    }

}