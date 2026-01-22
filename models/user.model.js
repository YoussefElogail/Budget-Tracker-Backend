const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Too short password"],
    },
    phone: [String],
    address: [String],
    dateOfBirth: Date,
    jobs: [String],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    wallets: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Wallet",
      },
    ],
    profileImage: String,
  },
  { timestamps: true },
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
