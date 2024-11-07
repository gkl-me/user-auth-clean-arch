import { JWTService } from "../infrastructure/auth/JWTService";
import { InMemory } from "../infrastructure/InMemory/InMemory";
import { AuthController } from "../interface/controller/authController";
import { LoginUser } from "../use-cases/auth/LoginUser";
import { RegisterUser } from "../use-cases/auth/RegisterUseCase";

export class DiContainer {
    private static instance:DiContainer
    private dependencies:Map<string,any>=new Map()
    constructor(){
        this.dependencies = new Map()
        this.setDependencies()
    }

    public static getInstance():DiContainer{
        if(!this.instance){
            this.instance = new DiContainer();
        }
        return this.instance;
    }

    private setDependencies(){
        const jwtService = new JWTService("access","refresh")

        const userRepository = new InMemory()

        const registerUser = new RegisterUser(userRepository)
        const loginUser = new LoginUser(userRepository,jwtService)

        const authController = new AuthController(registerUser,loginUser)

        this.dependencies.set('jwtSerive',jwtService)
        this.dependencies.set('userRepository',userRepository)
        this.dependencies.set('registerUser',registerUser)
        this.dependencies.set('loginUser',loginUser)
        this.dependencies.set('authController',authController)
    }

    public getDependencies(name:string){
        return this.dependencies.get(name)
    }
}