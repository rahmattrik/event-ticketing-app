import { AuthController } from "@/controllers/auth.controller";
import { Router } from "express";

export class AuthRouter {
    private router: Router;
    private authController: AuthController;

    constructor() {
        this.authController = new AuthController();
        this.router = Router();
        this.initializeRouter();
    }

    private initializeRouter(): void {
        this.router.post("/register", this.authController.registerController);
    }

    getRouter(): Router {
        return this.router
    }
}