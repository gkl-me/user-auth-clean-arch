import { Request, Response, NextFunction } from "express";
import { RegisterUser } from "../../use-cases/auth/RegisterUseCase";
import { LoginUser } from "../../use-cases/auth/LoginUser";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { LoginUserDTO } from "../dtos/LoginUserDTO";

export class AuthController {
  constructor(
    private registerUser: RegisterUser,
    private loginUser: LoginUser
  ) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateUserDTO = req.body;
      const user = await this.registerUser.execute(dto);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: LoginUserDTO = req.body;
      const { accessToken, refreshToken } = await this.loginUser.execute(dto);
      res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      next(error);
    }
  }
}
