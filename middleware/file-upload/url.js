const admin = require("firebase-admin");

const urlGenerator = async (userFileName) => {

  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(`user-file/${userFileName}`);
    const options = {
      action: "read",
      expires: Date.now() + 1000 * 60 * 60, // Waktu kedaluwarsa tautan (1 jam dari sekarang)
    };

    const [url] = await file.getSignedUrl(options);
    console.log(url);
    return url;
    // Jika Anda ingin mengirimkan tautan ke permintaan klien, gunakan res.status(200).json({ url });
  } catch (err) {
    console.log(err);
  }
};

module.exports = urlGenerator;
