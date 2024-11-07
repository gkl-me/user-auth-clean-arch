import { CreateUserDTO } from "../../interface/dtos/CreateUserDTO";
import { User } from "../entities/User";

export interface IUserRepository{
    create(user:CreateUserDTO): Promise<User|undefined>
    findByEmail(email:string): Promise<User|null>
}