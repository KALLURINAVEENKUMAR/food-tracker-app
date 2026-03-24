require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB Atlas connection...');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Found ✓' : 'Not found ✗');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas connected successfully!');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
