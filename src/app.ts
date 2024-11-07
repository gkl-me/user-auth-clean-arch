import express from "express";
import cookieParser from 'cookie-parser'
import { DiContainer } from "./di/newContainer";
import dotenv from 'dotenv'
import connectDB from "./infrastructure/database/config";
import { errorHandler } from "./interface/middlewares/errorHandler";
import { validator } from "./interface/middlewares/validator";
import { RegisterSchema } from "./interface/validators/RegisterSchema";
import { LoginSchema } from "./interface/validators/LoginSchema";
const app = express()

dotenv.config()
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const diContainer = DiContainer.getInstance()

const authControl = diContainer.getDependencies('authController')


app.post('/api/register',validator(RegisterSchema),authControl.register)
app.post('/api/login',validator(LoginSchema),authControl.login)

app.use(errorHandler)

app.listen(3000,()=>{
    console.log('server running')
})