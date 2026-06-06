import LandActivity from './LandActivity.js';

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
        // Convert total duration to hours (including minutes)
        const totalHours = this.duration.hours + (this.duration.minutes / 60);
        this.averageSpeed = totalHours > 0 ? (this.distance / totalHours).toFixed(2) : 0;
    }
}

export default CyclingActivity;