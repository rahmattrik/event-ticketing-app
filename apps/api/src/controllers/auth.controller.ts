import { registerService } from "@/services/auth/register.service";
import { NextFunction, Request, Response } from "express";

export class AuthController {
    async registerController(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await registerService(req.body);
            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }
}