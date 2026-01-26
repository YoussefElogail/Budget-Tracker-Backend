const { Router } = require("express");

const { signin, register } = require("../controllers/auth.controller");
const {
  signinValidator,
  registerValidator,
} = require("../util/validators/auth.validator");

const router = Router();

router.post("/signin", signinValidator, signin);
router.post("/register", registerValidator, register);

module.exports = router;
