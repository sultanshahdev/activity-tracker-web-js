# COMP 2150 Activity Tracker

A console-based activity tracker application that lets you manage cycling, running, walking, and swimming activities.

## Prerequisites

- Node.js v18+
- MongoDB (local installation or MongoDB Atlas cloud)

## Installation

1. Clone the repository and install dependencies:
```bash
cd activity-tracker-web-js
npm install
```

2. Create a `.env` file in the root directory with your MongoDB connection string:

**For local MongoDB:**
```
DATABASE_URI=mongodb://localhost:27017
```

**For MongoDB Atlas (cloud):**
```
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

## Setup

### Option 1: Local MongoDB Setup

**On Linux/Mac:**
```bash
# Install MongoDB via homebrew (Mac)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Or run MongoDB directly
mongod
```

**On Windows:**
- Download from https://www.mongodb.com/try/download/community
- Install and follow the installer prompts
- MongoDB will run as a service by default

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Add the connection string to `.env` file

## Seeding the Database

Once MongoDB is running, seed the database with sample activities:

```bash
npm run seed
```

This will create a database with:
- **5 Cycling activities** (different distances and elevations)
- **5 Walking activities** (urban and trail walks)
- **5 Running activities** (different paces and distances)
- **5 Swimming activities** (various lap counts and pool sizes)

**Example output:**
```
✓ Connected to MongoDB
✓ Dropped existing activities collection
✓ Inserted 20 activities into the database

========== Inserted Activities Summary ==========
Activities by type:
  Cycling: 5 activities
  Walking: 5 activities
  Running: 5 activities
  Swimming: 5 activities
```

## Running the Application

Start the activity tracker:

```bash
npm start
```

**Example output:**
```
Welcome to the COMP 2150 Activity Tracker.
Connecting to MongoDB...
Initializing Activity Tracker...

========== Activities ==========
[2022-07-23] Cycling: PerimeterCircuit at Winnipeg
     duration: PT2H45M
             distance : 80km
             elev     : 50m
        average speed : 29.09km/h
...

>>> QUERY [TOTAL-TIME] [BETWEEN (start date) (end date)] [ACTIVITY (activity type)] or QUIT
>>>
```

## Available Commands

### 1. TOTAL-TIME
Calculates and displays the total duration of all activities.

```
>>> TOTAL-TIME
>>> Querying total activity time:
>>> 18 hours and 45 minutes
```

### 2. ACTIVITY [type]
Filters activities by type (CYCLING, RUNNING, WALKING, or SWIMMING).

```
>>> ACTIVITY CYCLING
>>> Querying activities of type CYCLING

========== Activities ==========
[2022-07-23] Cycling: PerimeterCircuit at Winnipeg
     duration: PT2H45M
             distance : 80km
             elev     : 50m
        average speed : 29.09km/h
...
```

### 3. BETWEEN
Filters activities by date range.

```
>>> BETWEEN
Enter Starting Date (YYYY-MM-DD): 2022-07-01
Enter Ending Date (YYYY-MM-DD): 2022-08-31

========== Activities ==========
[2022-07-23] Cycling: PerimeterCircuit at Winnipeg
...
```

### 4. QUIT
Exits the application.

```
>>> QUIT
```

## Database Schema

Each activity has the following structure:

```javascript
{
  _id: ObjectId,
  activityType: "Cycling" | "Walking" | "Running" | "Swimming",
  name: String,              // No whitespace allowed
  location: String,          // No whitespace allowed
  date: Date,               // ISO 8601 format
  duration: String,         // ISO 8601 duration (e.g., "PT2H45M")
  
  // For Cycling, Walking, Running:
  distance: Number,         // kilometers
  elevation: Number,        // meters
  
  // For Swimming:
  laps: Number,            // number of laps
  lapLength: Number        // meters per lap
}
```

## Sample Activities Included

The seed script includes 20 diverse activities:

### Cycling
- PerimeterCircuit (80 km around Winnipeg)
- RiverTrail (45 km scenic ride)
- MountainPass (120 km Alpine challenge)
- CityCommute (15 km daily commute)
- CoastalRide (65 km coastal route)

### Walking
- store (2 km local trip)
- ParkStroll (3 km park walk)
- HikingTrail (12 km backcountry hike)
- CityWalk (5 km urban exploration)
- BeachWalk (8 km coastal walk)

### Running
- Track (5 km standard run)
- MorningJog (8 km morning routine)
- HalfMarathon (21 km race)
- SpeedWork (10 km tempo run)
- EveningRun (7 km casual pace)

### Swimming
- OpenSwim (10 laps × 50m pool)
- Laps (20 laps × 25m pool)
- WaterAerobics (15 laps × 50m pool)
- Triathlon (80 laps × 50m pool)
- Casual (8 laps × 25m pool)

## Troubleshooting

### MongoDB Connection Error
```
Failed to connect to MongoDB: connection refused
```
- Ensure MongoDB is running: `mongod`
- Check your DATABASE_URI in `.env`
- For Atlas, verify your IP is whitelisted

### No Activities Found
```
Database not connected. Returning empty activities.
```
- Run `npm run seed` to populate the database
- Check that your `.env` file has the correct DATABASE_URI

### Port Already in Use
If MongoDB's default port 27017 is already in use:
```bash
mongod --port 27018
# Then update DATABASE_URI=mongodb://localhost:27018
```

## Development Notes

- All class files use ES6 module syntax (`import`/`export`)
- Duration format follows ISO 8601 (e.g., `PT2H45M` = 2 hours 45 minutes)
- Activity names and locations cannot contain whitespace
- Dates are stored as ISO date strings for MongoDB compatibility
- The app gracefully handles database disconnections

## Next Steps

1. ✅ Install and configure MongoDB
2. ✅ Run `npm run seed` to populate test data
3. ✅ Run `npm start` to launch the tracker
4. ✅ Test queries with sample commands
5. 🔄 Extend with additional activity types or features

Enjoy tracking your activities! 🏃‍♂️🚴‍♀️🏊‍♂️
