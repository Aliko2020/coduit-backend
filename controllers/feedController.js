const Feeds = require("../Model/feedsModel");

//getting all feeds
const getFeeds = async (req, res) => {
  try {
    const feeds = await Feeds.find({});
    if (feeds.length > 0) {
      res.status(200).json(feeds);
    } else {
      res.status(404).json({ message: "No feeds found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred, please try again" });
  }
};


//get feed by id
const getfeedById = async (req, res) => {
  try {
    const feedId = req.params.id;
    const feed = await Feeds.findById(feedId);
    if (feed) {
      res.status(200).json(feed);
    } else {
      res.status(404).json({ message: "Feed not found" });
    }
  } catch (error) {
    res.status(401).json({ message: "an error occured, try again" });
  }
};

//post a feed
const postFeed = async (req, res) => {
    const newFeed = new Feeds(req.body);
    console.log(newFeed);
    
    try {
      const savedFeed = await newFeed.save();
      if (savedFeed) {
        res.status(201).json({ message: "Feed created successfully!" });
      } else {
        res.status(500).json({ message: "Error posting feed" });
      }
    } catch (error) {
      console.error("Error adding feed entry:", error); 
      res.status(500).json({ message: "Error adding feed entry" });
    }
  };
  

//comment on feed
const feedReply = async (req, res) => {
    const feedId = req.params.id;
    const { author, comment } = req.body;
  
    try {
      const feed = await Feeds.findByIdAndUpdate(feedId,
        { $push: { replies: { author, comment } } },
        { new: true }
      );
  
      if (!feed) {
        return res.status(404).json({ message: "Feed not found" });
      }
  
      res.json(feed);
    } catch (err) {
      console.error("Error adding reply:", err);
      res.status(500).json({ message: "Error adding reply" });
    }
  };
  

 

module.exports = {
  getFeeds,
  getfeedById,
  postFeed,
  feedReply
};
