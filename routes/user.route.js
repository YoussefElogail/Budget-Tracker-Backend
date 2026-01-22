const { Router } = require("express");

const {
  createUser,
  getAllUsers,
  fineUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  createUserValidator,
  updateUserValidator,
  showUserValidator,
  deleteUserValidator,
} = require("../util/validators/user.validator");

const router = Router();

router.route("/").post(createUserValidator, createUser).get(getAllUsers);
router
  .route("/:id")
  .get(showUserValidator, fineUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
