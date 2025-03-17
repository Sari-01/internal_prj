const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user")

router.post("/create_user", user_controller.create_user)
router.put("/update_user", user_controller.update_user)
router.delete("/delete_user", user_controller.delete_user)
router.get("/", user_controller.get_all)

module.exports = router;