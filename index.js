const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const feeds = require('./Model/feeds');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const Port = process.env.PORT || 3001;
const url = process.env.DBURL;

console.log(url);  // Print the URL to make sure it's correct

// Connect to MongoDB

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(Port, () => {
      console.log(`Server running on port: ${Port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/feeds', (req, res) => {
  feeds.find({})
    .then((feed) => {
      res.json(feed);
    })
    .catch((err) => console.log(err));
});

// Get feed by id
app.get('/feeds/:id', (req, res) => {
  const feedId = req.params.id;
  feeds.findById(feedId)
    .then((feed) => {
      if (!feed) {
        res.status(404).json({ message: 'Feed not found' });
      } else {
        res.json(feed);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error fetching feed details' });
    });
});

// Add new feed
app.post('/feeds/addfeed', async (req, res) => {
  try {
    const newFeed = new feeds(req.body);
    await newFeed.save();
    res.status(201).json({ message: 'Feed created successfully!' });
  } catch (error) {
    console.error('Error creating feed entry:', error);
    res.status(500).json({ message: 'Error adding feed entry' });
  }
});

// Add a reply to a feed
app.post('/feeds/:id/reply', (req, res) => {
  const feedId = req.params.id;
  const { author, comment } = req.body;

  feeds.findByIdAndUpdate(
    feedId,
    { $push: { replies: { author, comment } } },
    { new: true }
  )
    .then((feed) => {
      if (!feed) {
        res.status(404).json({ message: 'Feed not found' });
      } else {
        res.json(feed);
      }
    })
    .catch((err) => {
      console.error('Error adding reply:', err);
      res.status(500).json({ message: 'Error adding reply' });
    });
});
