import OfflandActivity from './OfflandActivity.js';

class SwimmingActivity extends OfflandActivity
{
    constructor(swimmingActivity)
    {
        super(swimmingActivity);
        this.activityType= "Swimming";
    }
}

export default SwimmingActivity;