import {z} from 'zod'
export const LoginSchema = z.object({
    email:z.string().email('Invalid email'),
    password:z.string().min(6,'Password should be min 6 char')
})