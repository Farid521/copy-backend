const admin = require('firebase-admin');

// Inisialisasi Firebase Admin
const serviceAccount = require('./middleware/file-upload/copy-co-firebase-adminsdk-9qf0x-94a326fbda.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://copy-co-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

// Simpan data ke Firebase
function simpanData(nama, nomorHP) {
  const database = admin.database();
  const ref = database.ref('kontak'); // 'kontak' adalah nama node di dalam database

  const newContact = ref.push();
  newContact.set({
    nama: nama,
    nomor_hp: nomorHP
  })
    .then(() => {
      console.log('Data berhasil disimpan ke Firebase');
    })
    .catch((error) => {
      console.error('Gagal menyimpan data ke Firebase:', error);
    });
}

// Panggil fungsi simpanData untuk menyimpan data
const nama = 'John Doe';
const nomorHP = '081234567890';
simpanData(nama, nomorHP);
