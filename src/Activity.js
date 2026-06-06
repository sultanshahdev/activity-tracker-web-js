class Activity
{
    constructor(activity)
    {
        if (!activity) throw new Error("Activity data is required");
        this.name = activity.name;
        this.location = activity.location;
        this.date = activity.date;
        this.duration = activity.duration;
    }

}