class WalkingActivity extends LandActivity
{
    constructor(runningActivity)
    {
        super(runningActivity)
        this.activityType="Walking";
        this.setAveragePace();
    }
    setAveragePace()
    {
        this.averagePace= this.duration.minutes / this.distance;
    }

}