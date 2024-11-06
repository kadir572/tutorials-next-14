'use client'

import { logout } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { redirect, RedirectType } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

export default function LogoutButton() {
  const [state, logoutAction] = useFormState(logout, undefined)

  return (
    <form action={logoutAction}>
      <LogoutButtonComponent />
    </form>
  )
}

function LogoutButtonComponent() {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type='submit'>
      Logout
    </Button>
  )
}
