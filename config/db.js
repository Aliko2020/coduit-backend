const mongoose = require("mongoose");

const connectdb = async () => {
      const url = process.env.DBURL;
      try {
        await mongoose.connect(url);
        console.log('MongoDB connected');
      } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
      }
};
    


module.exports = connectdb;
