const admin = require("firebase-admin");

const firebaseConn = async () => {
  const serviceAccount = require("./copy-co-firebase-adminsdk-9qf0x-94a326fbda.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};



exports.module = firebaseConn;
