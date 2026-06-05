class RunningActivity extends LandActivity
{
    constructor(runningActivity)
    {
        super(runningActivity)
        this.activityType="Running";
        setAveragePace();
    }
    set setAveragePace()
    {
        this.averagePace= this.duration.minutes / this.distance;
    }

}