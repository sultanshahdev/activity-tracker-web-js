class OfflandActivity extends Activity
{
    averagePace=null;
    constructor(activity)
    {
        super(activity)
        this.lapCount  = activity.lapCount ;
        this.lapLength = activity.lapLength;
        setAveragePace();
    }
    
    set averagePace()
    {
        return this.lapCount / lapLength;
    }
}