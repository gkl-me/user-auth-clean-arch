import { CreateUserDTO } from "../../interface/dtos/CreateUserDTO";
import { User } from "../entities/User";

export interface UserRepository{
    create(user:CreateUserDTO): Promise<User>
    findByEmail(email:string): Promise<User|null>
}