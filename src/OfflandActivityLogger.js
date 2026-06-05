class OfflandActivityLogger extends ActivityDetails
{
    constructor(activity)
    {
        super(activity)
        offlandActivityLogMsg()

    }
    set offlandActivityLogMsg()
    {
        this.logMsg +=
        `
        Laps Count : ${activity.lapsCount}
        Lap Length : ${activity.lapLength}
        `;
        
    }
}