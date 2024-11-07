import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserDTO } from "../../interface/dtos/CreateUserDTO";


export class RegisterUser{
    constructor(
        private userRepository:IUserRepository
    ){}

    async execute(dto:CreateUserDTO): Promise<User|undefined>{
        const user = {
            name:dto.name,
            email:dto.email,
            password:dto.password
        }

        return await this.userRepository.create(user)
    }
}