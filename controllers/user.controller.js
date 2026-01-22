const User = require("../models/user.model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./handlersFactory.controller");

// Create a new user
const createUser = createOne(User, "user");

// find all users
const getAllUsers = getAll(User);

//  fine one user
const fineUser = getOne(User);

// update user
const updateUser = updateOne(User, "user");

//  delete one user
const deleteUser = deleteOne(User, "user");

module.exports = {
  createUser,
  getAllUsers,
  fineUser,
  updateUser,
  deleteUser,
};
