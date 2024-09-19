import express  from "express";
import {deleteUserById, getUserById, getUserData, loginUser, postUserData, updateUserById} from "../controller/user-controller.js";

const userRoute= express.Router();

userRoute.post("/postUser", postUserData),
userRoute.get("/getUser",getUserData),
userRoute.get("/getUser/:id",getUserById),
userRoute.put("/updateUser/:id", updateUserById),
userRoute.delete("/deleteUser/:id",deleteUserById)

// login route
userRoute.post("/loginUser",loginUser)

export default userRoute;