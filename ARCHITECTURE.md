# Activity Tracker Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    ACTIVITY TRACKER APP                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │             ActivityTracker.js (Entry Point)            │  │
│  │  - Imports ApplicationManager                            │  │
│  │  - Calls: new ApplicationManager() → await app.init()   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           ApplicationManager (Main Logic)               │  │
│  │  - Manages readline interface                           │  │
│  │  - Orchestrates database calls                          │  │
│  │  - Processes user queries                               │  │
│  │  - Builds and displays activities                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│         ↓                              ↓                         │
│  ┌─────────────────┐     ┌────────────────────────────────┐   │
│  │ DatabaseHandler │     │     ActivityBuilder            │   │
│  │ - MongoDB ops   │     │ - Creates Activity objects     │   │
│  │ - Queries       │     │ - Parses durations             │   │
│  │ - Connections   │     │ - Maps activity types          │   │
│  └─────────────────┘     └────────────────────────────────┘   │
│         ↓                              ↓                         │
│  ┌─────────────────┐     ┌────────────────────────────────┐   │
│  │  MongoDB        │     │  Activity Class Hierarchy      │   │
│  │  activities_db  │     │                                │   │
│  │  - 20 activities│     │  Activity (base)               │   │
│  │  - Full CRUD    │     │  ├─ LandActivity               │   │
│  └─────────────────┘     │  │  ├─ Running                 │   │
│                          │  │  ├─ Walking                 │   │
│                          │  │  └─ Cycling                 │   │
│                          │  └─ OfflandActivity            │   │
│                          │     └─ Swimming                │   │
│                          └────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Class Hierarchy - Activities

```
Activity (Abstract)
├── name, location, date, duration
│
├── LandActivity
│   ├── distance, elevation
│   │
│   ├── RunningActivity
│   │   └── calculates averagePace
│   │
│   ├── WalkingActivity
│   │   └── calculates averagePace
│   │
│   └── CyclingActivity
│       └── calculates averageSpeed
│
└── OfflandActivity
    ├── laps, lapLength
    │
    └── SwimmingActivity
        └── calculates averagePace
```

## Class Hierarchy - Loggers

```
ActivityLogger
├── Creates generic activity format
│   - Date, type, name, location, duration
│
├── LandActivityLogger
│   ├── Adds: distance, elevation
│   │
│   ├── RunningActivityLogger
│   │   └── Adds: average pace
│   │
│   ├── WalkingActivityLogger
│   │   └── Adds: average pace
│   │
│   └── CyclingActivityLogger
│       └── Adds: average speed
│
└── OfflandActivityLogger
    ├── Adds: laps, lap length
    │
    └── SwimmingActivityLogger
        └── Adds: average pace
```

## Data Flow - Query Processing

```
User Input: "ACTIVITY CYCLING"
         ↓
ApplicationManager.entertainPrompt()
         ↓
fetchActivityOfType("Cycling")
         ↓
DatabaseHandler.fetchActivityOfType()
         ↓
MongoDB Query: { activityType: "Cycling" }
         ↓
20 Activities → Filter → 5 Cycling Activities
         ↓
Store in #activityDataset[]
         ↓
displayActivities()
         ↓
For each activity:
  - Create ActivityLog via ActivityTypeToLogTypeMap
  - Format with appropriate logger (CyclingActivityLogger)
  - Display formatted output
         ↓
Ready for next query
```

## Database Schema

```
activities_db
└── activities (collection)
    ├── _id: ObjectId
    ├── activityType: "Cycling|Walking|Running|Swimming"
    ├── name: String (no whitespace)
    ├── location: String (no whitespace)
    ├── date: Date (ISO format)
    ├── duration: String (ISO 8601: PT2H45M)
    ├── distance: Number (for Land activities)
    ├── elevation: Number (for Land activities)
    ├── laps: Number (for Swimming)
    └── lapLength: Number (for Swimming)

Sample Record:
{
  _id: ObjectId("6a246c62e1aa26c3c94d863a"),
  activityType: "Cycling",
  name: "PerimeterCircuit",
  location: "Winnipeg",
  date: ISODate("2022-07-23T00:00:00Z"),
  duration: "PT2H45M",
  distance: 80,
  elevation: 50
}
```

## Module Dependencies

```
ActivityTracker.js
└── ApplicationMangager.js
    ├── DatabaseHandler.js
    │   └── mongodb package
    │
    ├── ActivityBuilder.js
    │   ├── DurationUtils.js
    │   ├── RunningActivity.js
    │   ├── WalkingActivity.js
    │   ├── CyclingActivity.js
    │   └── SwimmingActivity.js
    │
    └── ActivityTypeToLogTypeMap.js
        ├── RunningActivityLogger.js
        ├── WalkingActivityLogger.js
        ├── CyclingActivityLogger.js
        └── SwimmingActivityLogger.js

Helper Scripts:
├── seedActivities.js → MongoDB
└── testConnection.js → Diagnostics
```

## Execution Flow

```
1. npm start
   ↓
2. ActivityTracker.js imports ApplicationManager
   ↓
3. ApplicationManager constructor:
   - Creates readline interface
   - Initializes DatabaseHandler
   - Initializes ActivityBuilder
   ↓
4. app.init() called:
   ↓
5. await #databaseHandler.initialize()
   - Creates MongoDB client
   - Connects to MongoDB (timeout: 5s)
   ↓
6. await fetchAllActivitiesFromDatabase()
   - Queries MongoDB for all activities
   - Builds Activity objects via ActivityBuilder
   - Stores in #activityDataset[]
   ↓
7. displayActivities()
   - Creates loggers for each activity
   - Formats output
   - Prints to console
   ↓
8. await checkForInputAndPerformQuery()
   - Readline prompts user
   - Awaits user input
   ↓
9. entertainPrompt(userInput)
   - Parses command (TOTAL-TIME, ACTIVITY, BETWEEN, QUIT)
   - Executes appropriate query
   - Returns to step 8
   ↓
10. User enters QUIT
    - Closes readline
    - Process exits
```

## File Organization

```
activity-tracker-web-js/
├── package.json
├── .env
├── README.md
├── SETUP_GUIDE.md
├── seedActivities.js
├── testConnection.js
└── src/
    ├── ActivityTracker.js (entry point)
    ├── ApplicationMangager.js (main orchestrator)
    ├── DatabaseHandler.js (MongoDB interface)
    ├── ActivityBuilder.js (factory pattern)
    ├── DurationUtils.js (ISO 8601 parser)
    ├── ActivityTypeToLogTypeMap.js (mapping)
    │
    ├── Activity.js (base class)
    ├── LandActivity.js
    ├── OfflandActivity.js
    ├── RunningActivity.js
    ├── WalkingActivity.js
    ├── CyclingActivity.js
    ├── SwimmingActivity.js
    │
    ├── ActivityLogger.js (base logger)
    ├── LandActivityLogger.js
    ├── OfflandActivityLogger.js
    ├── RunningActivityLogger.js
    ├── WalkingActivityLogger.js
    ├── CyclingActivityLogger.js
    └── SwimmingActivityLogger.js
```

## Activity Statistics (Seeded Data)

```
Total Activities: 20

By Type:
  Cycling:  5 (80km + 45km + 120km + 15km + 65km = 325km total)
  Walking:  5 (2km + 3km + 12km + 5km + 8km = 30km total)
  Running:  5 (5km + 8km + 21km + 10km + 7km = 51km total)
  Swimming: 5 (10+20+15+80+8 laps, various pool sizes)

Total Time: ~19 hours of activities
Date Range: July 2022 - February 2023
```

## Design Patterns Used

1. **Builder Pattern** - ActivityBuilder creates appropriate Activity objects
2. **Inheritance** - Activity/ActivityLogger class hierarchies
3. **Strategy Pattern** - Different loggers for different activity types
4. **Factory Pattern** - ActivityTypeToLogTypeMap creates correct logger instances
5. **Singleton Pattern** - Single DatabaseHandler instance per app
6. **Async/Promise Pattern** - Non-blocking database operations

## Key Technologies

- **Runtime**: Node.js v18+ with ES6 modules
- **Database**: MongoDB (local or Atlas)
- **I/O**: readline (Node.js native)
- **Package Manager**: npm
- **Config**: dotenv for environment variables

## Performance Considerations

- Database queries use efficient filtering
- Activities loaded once at startup
- Subsequent filters are in-memory
- No pagination (20 activities is manageable)
- Async/await prevents blocking

## Security Notes

- MongoDB connection timeout: 5 seconds
- Environment variables for sensitive data (.env)
- No authentication details in code
- Input validation via prompt parsing
- Error messages logged, not exposed

This architecture is scalable and maintainable for the COMP 2150 assignment requirements.
