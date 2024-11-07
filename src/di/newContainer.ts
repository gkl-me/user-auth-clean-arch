import { JWTService } from "../infrastructure/auth/JWTService";
import { MongoRepository } from "../infrastructure/database/MongoReposittory";
import { InMemory } from "../infrastructure/InMemory/InMemory";
import { AuthController } from "../interface/controller/authController";
import { LoginUser } from "../use-cases/auth/LoginUser";
import { RegisterUser } from "../use-cases/auth/RegisterUseCase";
import {BcryptService} from "../infrastructure/auth/BcryptService"

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

        const userRepository = new MongoRepository()
        const bcryptService  = new BcryptService

        const registerUser = new RegisterUser(userRepository,bcryptService)
        const loginUser = new LoginUser(userRepository,jwtService,bcryptService)

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