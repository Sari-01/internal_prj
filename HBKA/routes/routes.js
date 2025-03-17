const express=require("express");
const router=express.Router();
const login_controller=require("../controller/login_controller");
const admin_controller=require("../controller/admin_controller");
const hall_controller=require("../controller/hall_controller");

router.post("/login",login_controller.login);
router.post("/logout",login_controller.logout)

router.post("/create_user",admin_controller.create_user)
router.put("/update_user",admin_controller.update_user)
router.post("/delete_user",admin_controller.delete_user)
router.get("/get_all_users",admin_controller.get_all_users)

router.post("/create_hall",hall_controller.create_hall)
router.put("/update_hall",hall_controller.update_hall)
router.post("/delete_hall",hall_controller.delete_hall)
router.get("/get_all_hall_details",hall_controller.get_all_hall_details)





module.exports=router;