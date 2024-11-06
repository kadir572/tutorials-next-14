'use client'

import { useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { login } from '@/actions/auth'
import { useFormState, useFormStatus } from 'react-dom'

export default function LoginForm() {
  const [state, loginAction] = useFormState(login, undefined)

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <form className='flex flex-col gap-2' action={loginAction}>
      {state?.status === 'error' && (
        <div className='flex flex-col text-red-500 text-sm'>
          {state.error && <span>{state.error}</span>}
          {state.errors?.username?.map((err: string, index: number) => (
            <span key={index}>{err}</span>
          ))}
          {state.errors?.password?.map((err: string, index: number) => (
            <span key={index}>{err}</span>
          ))}
        </div>
      )}
      <div>
        <Label htmlFor='username'>Username</Label>
        <Input
          className={`${
            state?.errors?.username ? ' outline outline-red-500 outline-1' : ''
          }`}
          autoFocus
          id='username'
          name='username'
        />
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <Input
          className={
            state?.errors?.password ? 'outline outline-red-500 outline-1' : ''
          }
          id='password'
          type='password'
          name='password'
        />
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type='submit'>
      Login
    </Button>
  )
}
