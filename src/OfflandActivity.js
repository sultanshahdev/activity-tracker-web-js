class OfflandActivity extends Activity
{
    averagePace=null;
    constructor(activity)
    {
        super(activity)
        this.lapsCount  = activity.lapsCount ;
        this.lapLength = activity.lapLength;
        this.setAveragePace();
    }
    
    setAveragePace()
    {
        this.averagePace = this.lapsCount / this.lapLength;
    }
}