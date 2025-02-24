import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { authValidation } from "./auth.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/login",

  AuthControllers.loginUser
);

router.post(
  "/signup",
 
  AuthControllers.signupUser
);

export const AuthRouter = router;
