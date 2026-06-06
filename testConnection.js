import DatabaseHandler from './src/DatabaseHandler.js';

async function testConnection() {
  console.log("Testing MongoDB connection...");
  const db = new DatabaseHandler();
  await db.initialize();
  
  console.log("\nFetching all activities...");
  await db.fetchAllActivities();
  const activities = db.getResult();
  
  console.log(`\nFound ${activities.length} activities:`);
  activities.forEach((act, i) => {
    console.log(`${i + 1}. [${act.date.toISOString().split('T')[0]}] ${act.activityType}: ${act.name} at ${act.location} - Duration: ${act.duration}`);
  });

  if (activities.length > 0) {
    console.log("\nFirst activity details:");
    console.log(JSON.stringify(activities[0], null, 2));
  }
}

testConnection().catch(console.error);
