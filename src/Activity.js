class Activity
{
    constructor(activity)
    {
        this.name = activity.name;
        this.location = activity.location;
        this.date = activity.date;
        this.duration = activity.duration;
    }

    constructor(name,location,date,duration)
    {
        this.name = name;
        this.location = location;
        this.date = date;
        this.duration = duration;
    }
}