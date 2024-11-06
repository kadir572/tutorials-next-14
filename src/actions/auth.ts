'use server'

import { signIn, signOut } from '@/auth'
import { signInSchema } from '@/lib/zod'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const logout = async (prevState: any, formData: FormData) => {
  try {
    await signOut()
  } catch (e) {
    throw e
  }
}

export const login = async (prevState: any, formData: FormData) => {
  const result = signInSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      status: 'error',
      errors: result.error.flatten().fieldErrors,
    }
  }
  try {
    await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: 'error', error: 'Invalid credentials' }
        default:
          return { status: 'error', error: 'Something went wrong' }
      }
    }
    throw error
  }
  revalidatePath('/')
}
