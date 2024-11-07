import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepositories";
import { CreateUserDTO } from "../../interface/dtos/CreateUserDTO";


export class RegisterUser{
    constructor(
        private userRepository:UserRepository
    ){}

    async execute(dto:CreateUserDTO): Promise<User>{
        const user = {
            name:dto.name,
            email:dto.email,
            password:dto.password
        }

        return await this.userRepository.create(user)
    }
}