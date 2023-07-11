const admin = require('firebase-admin')

const bucket = admin.storage().bucket()

exports.module = bucket