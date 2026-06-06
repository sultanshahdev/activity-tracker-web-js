class CyclingActivity extends LandActivity
{
    constructor(cyclingActivity)
    {
        super(cyclingActivity);
        this.activityType = "Cycling";
        this.setAverageSpeed();
    }
    setAverageSpeed()
    {
        this.averageSpeed = this.distance/this.duration.hours;
    }
}