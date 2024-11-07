import { User } from "../../domain/entities/User"; 
import { IUserRepository } from "../../domain/repositories/IUserRepository"; 
import { BcryptService } from "../../infrastructure/auth/BcryptService";
import { JWTService } from "../../infrastructure/auth/JWTService";
import { LoginUserDTO } from "../../interface/dtos/LoginUserDTO"; 

export class LoginUser{
    constructor(
        private userRepository:IUserRepository,
        private jwtService: JWTService,
        private bcryptService: BcryptService
    ){}

    async execute(dto:LoginUserDTO): Promise<{accessToken:string,refreshToken:string}>{
        const user =  await this.userRepository.findByEmail(dto.email)
        if(!user){
            throw new Error('user email not found')
        }
        const comparePasswords = await this.bcryptService.comparePasswords(dto.password,user.password)
        if(!comparePasswords){
            throw new Error('Invalid Password')
        }
        const accessToken = this.jwtService.generateAccessToken(user)
        const refreshToken = this.jwtService.generateRefreshToken(user)

        return {accessToken,refreshToken}
    }
}