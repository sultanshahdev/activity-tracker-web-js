import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DATABASE_URI || "mongodb://localhost:27017";

// Sample activities data based on COMP 2150 assignment specs
const sampleActivities = [
  // CYCLING ACTIVITIES
  {
    activityType: "Cycling",
    name: "PerimeterCircuit",
    location: "Winnipeg",
    date: new Date("2022-07-23"),
    duration: "PT2H45M",
    distance: 80,
    elevation: 50
  },
  {
    activityType: "Cycling",
    name: "RiverTrail",
    location: "Assiniboine",
    date: new Date("2022-07-20"),
    duration: "PT1H30M",
    distance: 45,
    elevation: 15
  },
  {
    activityType: "Cycling",
    name: "MountainPass",
    location: "Banff",
    date: new Date("2022-08-05"),
    duration: "PT4H",
    distance: 120,
    elevation: 800
  },
  {
    activityType: "Cycling",
    name: "CityCommute",
    location: "Downtown",
    date: new Date("2022-08-15"),
    duration: "PT45M",
    distance: 15,
    elevation: 5
  },
  {
    activityType: "Cycling",
    name: "CoastalRide",
    location: "Vancouver",
    date: new Date("2022-09-10"),
    duration: "PT3H",
    distance: 65,
    elevation: 200
  },

  // WALKING ACTIVITIES
  {
    activityType: "Walking",
    name: "store",
    location: "Selkirk",
    date: new Date("2022-07-01"),
    duration: "PT20M",
    distance: 2,
    elevation: 1
  },
  {
    activityType: "Walking",
    name: "ParkStroll",
    location: "Assiniboine",
    date: new Date("2022-07-15"),
    duration: "PT45M",
    distance: 3,
    elevation: 0
  },
  {
    activityType: "Walking",
    name: "HikingTrail",
    location: "BanffNationalPark",
    date: new Date("2022-08-10"),
    duration: "PT3H",
    distance: 12,
    elevation: 300
  },
  {
    activityType: "Walking",
    name: "CityWalk",
    location: "Montreal",
    date: new Date("2022-08-20"),
    duration: "PT1H30M",
    distance: 5,
    elevation: 10
  },
  {
    activityType: "Walking",
    name: "BeachWalk",
    location: "Tofino",
    date: new Date("2022-09-05"),
    duration: "PT2H",
    distance: 8,
    elevation: 20
  },

  // RUNNING ACTIVITIES
  {
    activityType: "Running",
    name: "Track",
    location: "SilverHeights",
    date: new Date("2022-08-10"),
    duration: "PT30M",
    distance: 5,
    elevation: 0
  },
  {
    activityType: "Running",
    name: "MorningJog",
    location: "RiverPark",
    date: new Date("2022-08-12"),
    duration: "PT45M",
    distance: 8,
    elevation: 15
  },
  {
    activityType: "Running",
    name: "HalfMarathon",
    location: "Toronto",
    date: new Date("2022-08-25"),
    duration: "PT2H10M",
    distance: 21,
    elevation: 50
  },
  {
    activityType: "Running",
    name: "SpeedWork",
    location: "Oval",
    date: new Date("2022-09-01"),
    duration: "PT1H",
    distance: 10,
    elevation: 5
  },
  {
    activityType: "Running",
    name: "EveningRun",
    location: "Downtown",
    date: new Date("2022-09-15"),
    duration: "PT40M",
    distance: 7,
    elevation: 20
  },

  // SWIMMING ACTIVITIES
  {
    activityType: "Swimming",
    name: "OpenSwim",
    location: "PanAm",
    date: new Date("2023-01-10"),
    duration: "PT30M",
    laps: 10,
    lapLength: 50
  },
  {
    activityType: "Swimming",
    name: "Laps",
    location: "ReccPlex",
    date: new Date("2023-01-15"),
    duration: "PT45M",
    laps: 20,
    lapLength: 25
  },
  {
    activityType: "Swimming",
    name: "WaterAerobics",
    location: "AquaCenter",
    date: new Date("2023-01-20"),
    duration: "PT1H",
    laps: 15,
    lapLength: 50
  },
  {
    activityType: "Swimming",
    name: "Triathlon",
    location: "LakeWinnipeg",
    date: new Date("2023-02-05"),
    duration: "PT45M",
    laps: 80,
    lapLength: 50
  },
  {
    activityType: "Swimming",
    name: "Casual",
    location: "Community_Pool",
    date: new Date("2023-02-12"),
    duration: "PT30M",
    laps: 8,
    lapLength: 25
  }
];

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

    // Insert sample activities
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

    console.log("\nSample activities:");
    activities.slice(0, 5).forEach((activity) => {
      console.log(`  [${activity.date.toISOString().split("T")[0]}] ${activity.activityType}: ${activity.name} at ${activity.location}`);
    });

    console.log("\n✓ Database seeding completed successfully!");
    console.log("You can now run: npm start");

  } catch (error) {
    console.error("✗ Error seeding database:", error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase();
