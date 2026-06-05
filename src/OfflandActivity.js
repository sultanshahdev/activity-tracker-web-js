class OfflandActivity extends Activity
{
    averagePace=null;
    constructor(activity)
    {
        super(activity)
        this.lapsCount  = activity.lapsCount ;
        this.lapLength = activity.lapLength;
        setAveragePace();
    }
    
    set averagePace()
    {
        return this.lapCount / lapLength;
    }
}