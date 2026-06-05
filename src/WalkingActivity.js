class RunningActivity extends LandActivity
{
    constructor(runningActivity)
    {
        super(runningActivity)
        this.activityType="Walking";
        AveragePace();
    }
    set setAveragePace()
    {
        this.averagePace= this.duration.minutes / this.distance;
    }

}