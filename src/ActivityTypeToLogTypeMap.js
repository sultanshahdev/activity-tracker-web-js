import CyclingActivityLogger from './CyclingActivityLogger.js';
import WalkingActivityLogger from './WalkingActivityLogger.js';
import SwimmingActivityLogger from './SwimmingActivityLogger.js';
import RunningActivityLogger from './RunningActivityLogger.js';

let ActivityTypeToLogTypeMap = 
{
    Cycling : CyclingActivityLogger,
    Walking : WalkingActivityLogger,
    Swimming: SwimmingActivityLogger,
    Running : RunningActivityLogger
};

export default ActivityTypeToLogTypeMap;