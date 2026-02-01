const mongoose = require("mongoose");
const Wallet = require("./wallet.model");

const incomeSchema = new mongoose.Schema(
  {
    details: {
      type: String,
      required: true,
      trim: true,
      maxLength: [300, "Name cannot exceed 300 characters"],
      minLength: [2, "Name should have more than 2 characters"],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "IncomeCategory",
      required: true,
    },
    wallet: {
      type: mongoose.Schema.ObjectId,
      ref: "Wallet",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

incomeSchema.virtual("userWallet", {
  ref: "Wallet",
  localField: "wallet",
  foreignField: "_id",
  justOne: true,
});

incomeSchema.virtual("incomeCategory", {
  ref: "IncomeCategory",
  localField: "category",
  foreignField: "_id",
  justOne: true,
});

incomeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userWallet",
    select: "name balance",
  });
  this.populate({
    path: "incomeCategory",
    select: "name",
  });
});

incomeSchema.post("save", async function () {
  await Wallet.findByIdAndUpdate(this.wallet, {
    $inc: { balance: this.amount },
  });
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
