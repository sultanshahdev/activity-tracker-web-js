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
        this.averagePace = this.lapsCount / this.lapLength;
    }
}

export default OfflandActivity;