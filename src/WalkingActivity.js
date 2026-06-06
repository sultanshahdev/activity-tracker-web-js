import LandActivity from './LandActivity.js';

class WalkingActivity extends LandActivity
{
    constructor(walkingActivity)
    {
        super(walkingActivity);
        this.activityType="Walking";
        this.setAveragePace();
    }
    setAveragePace()
    {
        // Convert to total minutes and calculate pace per km
        const totalMinutes = this.duration.hours * 60 + this.duration.minutes;
        this.averagePace = totalMinutes > 0 ? (totalMinutes / this.distance).toFixed(2) : 0;
    }
}

export default WalkingActivity;