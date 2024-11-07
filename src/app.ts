import express from "express";
import cookieParser from 'cookie-parser'
import { container } from "./di/container";
import { DiContainer } from "./di/newContainer";
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const diContainer = DiContainer.getInstance()

const authControl = diContainer.getDependencies('authController')


app.post('/api/register',authControl.register)
app.post('/api/login',authControl.login)



app.listen(3000,()=>{
    console.log('server running')
})