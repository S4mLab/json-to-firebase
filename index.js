const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./service_key.json");
const data = require("./menu.json");

const collectionKey = "menus"; //name of the collection

// inititialise admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rhook-join.firebaseio.com"
});

// setting up firestore property
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// check if any data exists in the data file and if it is an object type
if (data && (typeof data === "object")) {
  // loop on data obj
  Object.keys(data).forEach(docKey => {
    // calling Firestore API to store each document
    firestore
      .collection(collectionKey) // setting collection name
      .doc() // setting doc name/key. Do not provide document key if u want auto generated doc key
      .set(data[docKey])
      .then((res) => {
        console.log("Document " + docKey + " successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
}