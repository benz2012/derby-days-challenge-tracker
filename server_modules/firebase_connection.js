var admin = require("firebase-admin");
if (process.env.NODE_ENV !== "production") {
  require('./env.js')
};

// Firebase Auth and Database Reference
var firebaseAdminAccount = {
  "type": "service_account",
  "project_id": "derby-days-challenge-tracker",
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  // "private_key": "-----BEGIN PRIVATE KEY-----\n" + process.env.FIREBASE_PRIVATE_KEY + "\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ox8yg@derby-days-challenge-tracker.iam.gserviceaccount.com",
  "client_id": "104557530751342087230",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ox8yg%40derby-days-challenge-tracker.iam.gserviceaccount.com"
}
admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminAccount),
  databaseURL: "https://derby-days-challenge-tracker.firebaseio.com/"
});
var db = admin.database();
var ref = db.ref();

// Firebase Actions
exports.getFireData = function(collection, callback) {
  var childRef = ref.child(collection);
  childRef.once("value", function(snapshot) {
    callback(snapshot.val());
  });
}

exports.updateFireData = function(collection, data) {
  var childRef = ref.child(collection);
  childRef.update(data, function(err) {
    if (err) {console.log("Data could not be saved", error)}
  });
}

exports.realtimeReference = function(collection, callback) {
  callback(db.ref(collection));
}
