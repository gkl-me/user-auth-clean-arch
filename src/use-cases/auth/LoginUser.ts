import { User } from "../../domain/entities/User"; 
import { IUserRepository } from "../../domain/repositories/IUserRepository"; 
import { JWTService } from "../../infrastructure/auth/JWTService";
import { LoginUserDTO } from "../../interface/dtos/LoginUserDTO"; 

export class LoginUser{
    constructor(
        private userRepository:IUserRepository,
        private jwtService: JWTService
    ){}

    async execute(dto:LoginUserDTO): Promise<{accessToken:string,refreshToken:string}>{
        const user =  await this.userRepository.findByEmail(dto.email)
        if(!user || user.password != dto.password){
            throw new Error('Invalid Password or user email not found')
        }

        const accessToken = this.jwtService.generateAccessToken(user)
        const refreshToken = this.jwtService.generateRefreshToken(user)

        return {accessToken,refreshToken}
    }
}