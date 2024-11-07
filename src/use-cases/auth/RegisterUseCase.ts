import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { BcryptService } from "../../infrastructure/auth/BcryptService";
import { CreateUserDTO } from "../../interface/dtos/CreateUserDTO";


export class RegisterUser{
    constructor(
        private userRepository:IUserRepository,
        private bcryptService:BcryptService
    ){}

    async execute(dto:CreateUserDTO): Promise<User|undefined>{
        const hashedPassword = await this.bcryptService.hashPassword(dto.password)
        const user = {
            name:dto.name,
            email:dto.email,
            password:hashedPassword
        }

        return await this.userRepository.create(user)
    }
}