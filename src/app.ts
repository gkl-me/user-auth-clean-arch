import express from "express";
import cookieParser from 'cookie-parser'
import { container } from "./di/container";
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.post('/api/register',(req,res) => container.authController.register(req,res))
app.post('/api/login',(req,res) => container.authController.login(req,res))



app.listen(3000,()=>{
    console.log('server running')
})