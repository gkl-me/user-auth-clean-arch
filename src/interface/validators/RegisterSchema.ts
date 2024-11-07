import {z} from 'zod'

export const RegisterSchema = z.object({
    name:z.string().min(2,'Name should be min 2 char'),
    email:z.string().email('Invalid email'),
    password:z.string().min(6,'Password should be min 6 char')
})

