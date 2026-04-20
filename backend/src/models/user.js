import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  appid: Number,
  name: String,
  hours: Number,
  recentHours: Number,
});

const userSchema = new mongoose.Schema({
  steamid: {
    type: String,
    required: true,
    unique: true,
  },

  profile: {
    totalHours: Number,
    avgPlaytime: Number,
    dominantPlaystyle: String,
    recentActivity: Number,
  },

  topGames: [gameSchema],
  recentGames: [gameSchema],

  lastSynced: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);