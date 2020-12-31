const admin = require('firebase-admin');

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todoapp-b4b6c.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };