import Activity from './Activity.js';

class OfflandActivity extends Activity
{
    averagePace=null;
    constructor(activity)
    {
        super(activity);
        this.lapsCount  = activity.laps;
        this.lapLength = activity.lapLength;
        this.setAveragePace();
    }
    
    setAveragePace()
    {

        const totalMinutes = this.duration.hours * 60 + this.duration.minutes;
        const distance     = this.lapsCount * this.lapLength / 1000
        this.averagePace = totalMinutes > 0 ? (totalMinutes / distance).toFixed(2) : 0;
    }
}

export default OfflandActivity;