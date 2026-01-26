const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, "Name cannot exceed 50 characters"],
      minLength: [2, "Name should have more than 2 characters"],
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

walletSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email profileImage",
  });
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
