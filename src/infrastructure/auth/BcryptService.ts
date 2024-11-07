import bcrypt from 'bcrypt'

export class BcryptService{
    constructor(
        private salt:number=10
    ){}

    async hashPassword(password:string): Promise<string>{
        const salt = await bcrypt.genSalt(this.salt)
        return await bcrypt.hash(password, salt)
    }

    async comparePasswords(password:string, hashedPassword:string): Promise<boolean>{
        return await bcrypt.compare(password, hashedPassword)
    }
}