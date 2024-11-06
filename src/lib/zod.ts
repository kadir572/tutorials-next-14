import { object, string } from 'zod'

export const signInSchema = object({
  username: string({ required_error: 'Username is required' }).min(
    1,
    'Username required'
  ),
  password: string({ required_error: 'Password is required' }).min(
    1,
    'Password required'
  ),
})
