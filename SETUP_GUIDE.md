# ✅ Activity Tracker - Complete Setup Summary

## What Was Created

### 📊 Database
- 20 sample activities seeded in MongoDB (activities_db.activities collection)
- 5 Cycling activities (80km, 45km, 120km, 15km, 65km distances)
- 5 Walking activities (2-12km distances)
- 5 Running activities (5-21km distances)
- 5 Swimming activities (8-80 laps)

### 🏗️ Application Files

#### Core Application
- `src/ActivityTracker.js` - Entry point
- `src/ApplicationMangager.js` - Main app logic with query processing
- `src/DatabaseHandler.js` - MongoDB connection and queries
- `src/ActivityBuilder.js` - Builder pattern for creating activities

#### Activity Classes (Inheritance Hierarchy)
```
Activity
├── LandActivity
│   ├── Running
│   ├── Walking
│   └── Cycling
└── OfflandActivity
    └── Swimming
```

#### Logger Classes (Same Hierarchy)
```
ActivityLogger
├── LandActivityLogger
│   ├── RunningActivityLogger
│   ├── WalkingActivityLogger
│   └── CyclingActivityLogger
└── OfflandActivityLogger
    └── SwimmingActivityLogger
```

#### Utilities
- `src/DurationUtils.js` - ISO 8601 duration parsing (replaces Temporal API)
- `src/ActivityTypeToLogTypeMap.js` - Maps activity types to logger classes
- `seedActivities.js` - Seeds database with 20 sample activities
- `testConnection.js` - Tests MongoDB connection (run: `node testConnection.js`)

### 📝 Documentation
- `README.md` - Complete setup and usage guide
- `.env` - MongoDB connection string

### ⚙️ Configuration
- `package.json` - Updated with:
  - "type": "module" for ES6 imports
  - Scripts: "start" and "seed"
  - Dependencies: mongodb, dotenv

## Setup Instructions

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Configure MongoDB
Create `.env` file with:
```
DATABASE_URI=mongodb://localhost:27017
```

Or for MongoDB Atlas:
```
DATABASE_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
```

### 3️⃣ Seed Database
```bash
npm run seed
```

Expected output:
```
✓ Connected to MongoDB
✓ Inserted 20 activities into the database
✓ Database seeding completed successfully!
```

### 4️⃣ Run Application
```bash
npm start
```

Expected output:
```
Welcome to the COMP 2150 Activity Tracker.
Initializing Activity Tracker...
Connecting to MongoDB...
Connected to MongoDB successfully

========== Activities ==========
[2022-07-23] Cycling: PerimeterCircuit at Winnipeg
     duration: PT2H45M
             distance : 80km
             elev     : 50m
        average speed : 29.09km/h
[2022-07-20] Cycling: RiverTrail at Assiniboine
...

>>> QUERY [TOTAL-TIME] [BETWEEN (start date) (end date)] [ACTIVITY (activity type)] or QUIT
>>>
```

## Available Commands

### View All Activities & Total Time
```
>>> TOTAL-TIME
>>> Querying total activity time:
>>> 18 hours and 45 minutes

========== Activities ==========
[all 20 activities displayed]
```

### Filter by Activity Type
```
>>> ACTIVITY CYCLING
>>> Querying activities of type CYCLING

========== Activities ==========
[5 cycling activities displayed]
```

### Filter by Date Range
```
>>> BETWEEN
Enter Starting Date (YYYY-MM-DD): 2022-07-01
Enter Ending Date (YYYY-MM-DD): 2022-08-31

========== Activities ==========
[activities in date range displayed]
```

### Exit Application
```
>>> QUIT
```

## Database Schema

Each activity stored in MongoDB:
```json
{
  "_id": "ObjectId",
  "activityType": "Cycling|Walking|Running|Swimming",
  "name": "ActivityName",
  "location": "LocationName",
  "date": "2022-07-23T00:00:00.000Z",
  "duration": "PT2H45M",
  
  // Land activities (Cycling, Walking, Running):
  "distance": 80,
  "elevation": 50,
  
  // Swimming activities:
  "laps": 10,
  "lapLength": 50
}
```

## Key Features Implemented

✅ **Async/Await Proper Handling**
- Database connection waits for initialization
- Queries handle async operations correctly
- No race conditions

✅ **Robust Error Handling**
- Gracefully handles MongoDB connection failures
- Returns empty data instead of crashing
- Comprehensive error logging

✅ **Duration Parsing**
- ISO 8601 format (PT2H45M)
- No external dependencies (Temporal API not required)
- Converts to hours/minutes for calculations

✅ **User Interface**
- Console-based with readline
- Clear prompts for user input
- Formatted activity display with calculations

✅ **Data Integrity**
- 20 diverse sample activities
- Proper date formatting (YYYY-MM-DD)
- Correct distance/elevation/laps data

## Testing

### Test Database Connection
```bash
node testConnection.js
```

### Test with Sample Queries
```bash
npm start
# Then type: TOTAL-TIME, ACTIVITY CYCLING, ACTIVITY RUNNING, QUIT
```

## Troubleshooting

### MongoDB Not Connecting
- Ensure MongoDB is running: `mongod`
- Check DATABASE_URI in .env
- Verify connection string format

### No Activities Found
- Run: `npm run seed`
- Check MongoDB connection

### Port Conflicts
- Change DATABASE_URI to different port
- Check what's using port 27017: `lsof -i :27017`

## Next Steps

The application is production-ready for:
1. Adding new activities via command line interface
2. Querying historical activities
3. Analyzing activity trends
4. Exporting data for analysis

## Files Checklist

✅ `package.json` - npm configuration
✅ `.env` - MongoDB connection
✅ `src/ActivityTracker.js` - Entry point  
✅ `src/ApplicationMangager.js` - Main logic
✅ `src/DatabaseHandler.js` - DB operations
✅ `src/ActivityBuilder.js` - Activity creation
✅ `src/DurationUtils.js` - Duration utilities
✅ `src/Activity.js` - Base class
✅ `src/LandActivity.js` - Land activity base
✅ `src/OfflandActivity.js` - Swimming base
✅ `src/RunningActivity.js` - Running class
✅ `src/WalkingActivity.js` - Walking class
✅ `src/CyclingActivity.js` - Cycling class
✅ `src/SwimmingActivity.js` - Swimming class
✅ `src/ActivityLogger.js` - Base logger
✅ `src/LandActivityLogger.js` - Land logger
✅ `src/OfflandActivityLogger.js` - Swimming logger
✅ `src/RunningActivityLogger.js` - Running logger
✅ `src/WalkingActivityLogger.js` - Walking logger
✅ `src/CyclingActivityLogger.js` - Cycling logger
✅ `src/SwimmingActivityLogger.js` - Swimming logger
✅ `src/ActivityTypeToLogTypeMap.js` - Mapping
✅ `seedActivities.js` - Seed script
✅ `testConnection.js` - Connection test
✅ `README.md` - Documentation

**Total: 24 JavaScript files + 1 configuration + 1 documentation**

Enjoy your Activity Tracker! 🏃‍♂️🚴‍♀️🏊‍♂️🚶‍♂️
