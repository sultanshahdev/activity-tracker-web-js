class LandActivity extends  Activity
{
    constructor(activity)
    {
        if (!activity) throw new Error("Activity data is required");
        super(activity);
        this.distance = activity.distance;
        this.elevation = activity.elevation;
    }
}