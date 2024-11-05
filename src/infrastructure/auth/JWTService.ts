import jwt from 'jsonwebtoken'
import { User } from "../../domain/entities/User";

export class JWTService{
    constructor(
        private accessTokenSecret:string,
        private refreshTokenSecret:string
    ){}

    generateAccessToken(user:User):string{
        return jwt.sign({userId:user.email},this.accessTokenSecret,{expiresIn:'15m'})
    }

    generateRefreshToken(user:User):string{
        return jwt.sign({userId:user.email},this.refreshTokenSecret,{expiresIn:'7d'})
    }

    verifyAccessToken(token:string):{userEmail:string}{
        return jwt.verify(token,this.accessTokenSecret) as {userEmail:string}
    }

    verifyRefreshToken(token:string):{userEmail:string}{
        return jwt.verify(token,this.refreshTokenSecret) as {userEmail:string}
    }
}