class RunningActivity extends LandActivity
{
    constructor(runningActivity)
    {
        super(runningActivity)
        this.activityType="Running";
        this.setAveragePace();
    }
    setAveragePace()
    {
        this.averagePace= this.duration.minutes / this.distance;
    }

}