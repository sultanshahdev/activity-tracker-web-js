class SwimmingActivity extends OfflandActivity
{
    constructor(swimmingActivity)
    {
        super(swimmingActivity);
        this.activityName = "Swimming"
        setPace();
    }
    set setPace()
    {
        this.averagePace = this.duration.minutes / distance; 
    }

}