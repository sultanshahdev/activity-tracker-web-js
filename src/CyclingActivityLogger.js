class CyclingActivityLogger extends LandActivityLogger
{
    constructor(cyclingActivity)
    {
        super(cyclingActivity)
        this.cyclingActivityLog()
    }
    cyclingActivityLog()
    {
        this.logMsg +=
        `
        average speed : ${activity.averageSpeed}km/h
        `;
    }

}