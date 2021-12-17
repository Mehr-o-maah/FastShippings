// import connection library
let MongoClient = require("mongodb").MongoClient;
// Import db Conection
let { connectionString, dbName } = require("./dbConfig");
// Functions
async function testConection() {
  try {
    let connection = await MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let db = connection.db(dbName);
    let numCollections = (await db.collections()).length;
    return numCollections > 0;
  } catch (ex) {
    return false;
  }
}

async function findData(collectionName, filter) {
  try {
    let connection = await MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let db = connection.db(dbName);
    let collection = db.collection(collectionName);
    let cursor = collection.find(filter);
    let result = [];
    let currentDocument = await cursor.next();
    while (currentDocument) {
      result.push(currentDocument);
      currentDocument = await cursor.next();
    }

    return result;
  } catch (ex) {
    return "Estamos haciendo algo mal";
  }
}

// Exports
module.exports.testConection = testConection;
module.exports.findData = findData;
