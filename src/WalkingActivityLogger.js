class WalkingActivityLogger extends LandActivityLogger
{
    constructor(walkingActivity)
    {
        super(walkingActivity)
        walkingActivityLog()
    }
    set walkingActivityLog()
    {
        this.logMsg +=
        `
            average pace : ${this.activity.averagePace}
        `;
    }

}