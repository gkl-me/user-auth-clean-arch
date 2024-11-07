import { JWTService } from "../infrastructure/auth/JWTService";
import { InMemory } from "../infrastructure/InMemory/InMemory";
import { AuthController } from "../interface/controller/authController";
import { RegisterUser } from "../use-cases/auth/RegisterUseCase";
import { LoginUser } from "../use-cases/LoginUser";
import { UserRepository } from "../domain/repositories/userRepositories";
// import { IJWTService } from "../domain/services/IJWTService";

const createContainer = () => {
  const userRepository: UserRepository = new InMemory();
  const jwtService = new JWTService('access', 'refresh');

  const registerUser = new RegisterUser(userRepository);
  const loginUser = new LoginUser(userRepository, jwtService);

  const authController = new AuthController(registerUser, loginUser);

  return {
    userRepository,
    jwtService,
    registerUser,
    loginUser,
    authController
  };
};

export const container = createContainer();