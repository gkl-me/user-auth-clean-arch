import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserDTO } from "../../interface/dtos/CreateUserDTO";
import { UserModel } from "./Users.model";

export class MongoRepository implements IUserRepository{
    async create(user: CreateUserDTO): Promise<User> {
        const newUser = new UserModel({
            name: user.name,
            email: user.email,
            password: user.password
        })
        await newUser.save()
        console.log(newUser)
        return {name:newUser.name, email:newUser.email, password:newUser.password}
    }

    async findByEmail(email: string): Promise<User|null> {
        const user = await UserModel.findOne({email: email}).exec()
        return user?user:null
    }
}