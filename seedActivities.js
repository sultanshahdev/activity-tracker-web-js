import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DATABASE_URI || "mongodb://localhost:27017";


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

/** Returns an ISO 8601 duration string from hours and minutes */
function toDuration(hours, minutes) {
  if (hours > 0 && minutes > 0) return `PT${hours}H${minutes}M`;
  if (hours > 0) return `PT${hours}H`;
  return `PT${minutes}M`;
}

/** Returns a random Date between two date strings */
function randomDate(start, end) {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return new Date(s + Math.random() * (e - s));
}

// ──────────────────────────────────────────────────────────
//  Name & location pools for each activity type
// ──────────────────────────────────────────────────────────

const cyclingNames = [
  "PerimeterCircuit", "RiverTrail", "MountainPass", "CityCommute",
  "CoastalRide", "HillClimb", "ValleyLoop", "LakeshoreRide",
  "ForestPath", "DowntownLoop", "SunriseRide", "SunsetCruise",
  "CountryRoad", "BridgeRoute", "CanalPath", "PrairieRide",
  "IslandLoop", "HarborTrail", "UniversityLoop", "IndustrialRoute",
  "ParkCircuit", "TrailblazRide", "VillageTour", "WaterfrontRide",
  "RidgeRoad"
];

const walkingNames = [
  "store", "ParkStroll", "HikingTrail", "CityWalk", "BeachWalk",
  "NatureTrail", "LakesidePath", "GardenWalk", "HistoricTour",
  "RiverWalk", "ForestHike", "SunsetWalk", "MorningStroll",
  "MallWalk", "NeighborhoodLoop", "CampusWalk", "MarketWalk",
  "BridgeWalk", "BoardwalkStroll", "MeadowHike", "HillsideTrail",
  "DogWalk", "LunchWalk", "SchoolRoute", "TrailWalk"
];

const runningNames = [
  "Track", "MorningJog", "HalfMarathon", "SpeedWork", "EveningRun",
  "TempoRun", "IntervalSprint", "LongRun", "RecoveryJog", "HillRepeats",
  "ParkRun", "TrailRun", "FartlekSession", "RacePrep", "CooldownRun",
  "5kRace", "10kRace", "MidnightRun", "CrossCountry", "StadiumStairs",
  "BeachRun", "TreadmillRun", "MarathonTraining", "SunriseJog",
  "RelayLeg"
];

const swimmingNames = [
  "OpenSwim", "Laps", "WaterAerobics", "Triathlon", "Casual",
  "SprintLaps", "EnduranceSwim", "BackstrokeDrill", "FreestyleLaps",
  "MedleyPractice", "DivePractice", "RelaySwim", "RecoverySwim",
  "TechniqueWork", "KickDrill", "PullSet", "WarmupSwim", "CooldownSwim",
  "CompetitionPrep", "OpenWater", "LakeCrossing", "PoolParty",
  "MasterSwim", "SwimClinic", "MorningLaps"
];

const locations = [
  "Winnipeg", "Assiniboine", "Banff", "Downtown", "Vancouver",
  "Selkirk", "Montreal", "Tofino", "Toronto", "Calgary",
  "Edmonton", "Ottawa", "Halifax", "Victoria", "Kelowna",
  "Saskatoon", "Regina", "StJohns", "Fredericton", "Charlottetown",
  "ThunderBay", "Whitehorse", "Yellowknife", "Moncton", "Kamloops",
  "BanffNationalPark", "JasperPark", "WhistlerVillage", "NiagaraFalls",
  "PrinceGeorge", "SilverHeights", "RiverPark", "Oval", "Community_Pool",
  "PanAm", "ReccPlex", "AquaCenter", "LakeWinnipeg", "GrandBeach",
  "BirdsHillPark"
];

// ──────────────────────────────────────────────────────────
//  Activity generators
// ──────────────────────────────────────────────────────────

function generateCycling() {
  const distKm = randomInt(10, 150);
  const speedKmH = randomInt(18, 38);
  const totalMinutes = Math.round((distKm / speedKmH) * 60);
  const hours = Math.floor(totalMinutes / 60);
  const mins  = totalMinutes % 60;

  return {
    activityType: "Cycling",
    name: pick(cyclingNames),
    location: pick(locations),
    date: randomDate("2022-07-01", "2023-02-28"),
    duration: toDuration(hours, mins),
    distance: distKm,
    elevation: randomInt(0, 900)
  };
}

function generateWalking() {
  const distKm = randomInt(1, 15);
  const paceMinPerKm = randomInt(10, 20);
  const totalMinutes = distKm * paceMinPerKm;
  const hours = Math.floor(totalMinutes / 60);
  const mins  = totalMinutes % 60;

  return {
    activityType: "Walking",
    name: pick(walkingNames),
    location: pick(locations),
    date: randomDate("2022-07-01", "2023-02-28"),
    duration: toDuration(hours, mins),
    distance: distKm,
    elevation: randomInt(0, 350)
  };
}

function generateRunning() {
  const distKm = randomInt(2, 42);
  const paceMinPerKm = randomInt(4, 8);
  const totalMinutes = distKm * paceMinPerKm;
  const hours = Math.floor(totalMinutes / 60);
  const mins  = totalMinutes % 60;

  return {
    activityType: "Running",
    name: pick(runningNames),
    location: pick(locations),
    date: randomDate("2022-07-01", "2023-02-28"),
    duration: toDuration(hours, mins),
    distance: distKm,
    elevation: randomInt(0, 200)
  };
}

function generateSwimming() {
  const lapLength = pick([25, 50]);
  const laps = randomInt(4, 100);
  const totalMinutes = Math.round(laps * (lapLength === 50 ? 1.5 : 0.8));
  const hours = Math.floor(totalMinutes / 60);
  const mins  = totalMinutes % 60;

  return {
    activityType: "Swimming",
    name: pick(swimmingNames),
    location: pick(locations),
    date: randomDate("2022-07-01", "2023-02-28"),
    duration: toDuration(hours, mins),
    laps: laps,
    lapLength: lapLength
  };
}

// ──────────────────────────────────────────────────────────
//  Build the 500 activities — 125 per type
// ──────────────────────────────────────────────────────────

const TOTAL = 500;
const PER_TYPE = TOTAL / 4; // 125

const sampleActivities = [];

for (let i = 0; i < PER_TYPE; i++) sampleActivities.push(generateCycling());
for (let i = 0; i < PER_TYPE; i++) sampleActivities.push(generateWalking());
for (let i = 0; i < PER_TYPE; i++) sampleActivities.push(generateRunning());
for (let i = 0; i < PER_TYPE; i++) sampleActivities.push(generateSwimming());

// ──────────────────────────────────────────────────────────
//  Seed the database
// ──────────────────────────────────────────────────────────

async function seedDatabase() {
  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    console.log("✓ Connected to MongoDB");

    const db = client.db("activities_db");
    const collection = db.collection("activities");

    // Drop existing collection if it exists
    try {
      await collection.drop();
      console.log("✓ Dropped existing activities collection");
    } catch (e) {
      console.log("✓ No existing collection to drop");
    }

    // Insert all 500 activities
    const result = await collection.insertMany(sampleActivities);
    console.log(`✓ Inserted ${result.insertedCount} activities into the database`);

    // Display summary
    console.log("\n========== Inserted Activities Summary ==========");
    const activities = await collection.find({}).toArray();

    const activityTypes = {};
    activities.forEach((activity) => {
      if (!activityTypes[activity.activityType]) {
        activityTypes[activity.activityType] = 0;
      }
      activityTypes[activity.activityType]++;
    });

    console.log("Activities by type:");
    Object.entries(activityTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} activities`);
    });

    console.log("\nSample activities (first 10):");
    activities.slice(0, 10).forEach((activity) => {
      const dateStr = activity.date.toISOString().split("T")[0];
      const extra = activity.activityType === "Swimming"
        ? `${activity.laps} laps × ${activity.lapLength}m`
        : `${activity.distance}km, elev ${activity.elevation}m`;
      console.log(`  [${dateStr}] ${activity.activityType}: ${activity.name} at ${activity.location} — ${activity.duration} (${extra})`);
    });

    console.log(`\n✓ Database seeding completed successfully! (${result.insertedCount} activities)`);
    console.log("You can now run: npm start");

  } catch (error) {
    console.error("✗ Error seeding database:", error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase();
