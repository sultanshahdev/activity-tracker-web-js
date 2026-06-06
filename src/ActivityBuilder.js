class ActivityBuilder {
    constructor() {
        this.rawActivity = null;
        this.activityType = null;
        this.builtActivity = null;

        this.ActivityTypeMap = {
            Swimming: SwimmingActivity,
            Running : RunningActivity,
            Cycling : CyclingActivity,
            Walking : WalkingActivity
        };
    }

    setActivity(activity) {
        this.rawActivity = activity;
    }

    createActivity() {
        this.identifyActivityType();
        this.normalize();
        this.buildActivity();
        return this.builtActivity;
    }

    identifyActivityType() {
        this.activityType = this.ActivityTypeMap[this.rawActivity.activityType];
    }

    normalize() {
        this.rawActivity.date = new Date(this.rawActivity.date);
        this.rawActivity.duration = Temporal.Duration.from(this.rawActivity.duration);
    }
 
    buildActivity() {
        this.builtActivity = new this.activityType(this.rawActivity);
    }
}