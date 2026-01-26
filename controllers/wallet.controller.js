const asyncHandler = require("express-async-handler");

const Wallet = require("../models/wallet.model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./handlersFactory.controller");

const addUserToWallet = asyncHandler(async (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user._id;
  }
  next();
});

// Create a new wallet
const createWallet = createOne(Wallet, "wallet");

// find all expense categories
const getAllWallets = getAll(Wallet);

//  fined one wallet
const finedWallet = getOne(Wallet);

// update wallet
const updateWallet = updateOne(Wallet, "wallet");

//  delete one wallet
const deleteWallet = deleteOne(Wallet, "wallet");

module.exports = {
  addUserToWallet,
  createWallet,
  getAllWallets,
  finedWallet,
  updateWallet,
  deleteWallet,
};
