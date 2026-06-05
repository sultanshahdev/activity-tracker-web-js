class CyclingActivity extends LandActivity
{
    constructor(cyclingActivity)
    {
        super(cyclingActivity);
        this.activityType = "Cycling";
        setAverageSpeed();
    }
    set setAverageSpeed()
    {
        this.averageSpeed = this.distance/this.duration.hours;
    }
}