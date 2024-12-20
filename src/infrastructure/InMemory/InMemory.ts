import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class InMemory implements IUserRepository{
    private users:User[] = [];

    async create(user: User): Promise<User> {
        this.users.push(user)
        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find((ele) => ele.email==email)
        return user?user:null
    }

}