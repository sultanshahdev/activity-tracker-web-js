class LandActivityLogger extends ActivityLogger
{
    constructor(landActivity)
    {
        super(landActivity)
        landActivityLogMsg()
    }
    set landActivityLogMsg()
    {
        logMsg +=
        `
            distance : ${activity.distance}km
            elev     : ${activity.elevation}m
        `
    }
}