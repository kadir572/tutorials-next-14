import LoginForm from '@/components/LoginForm'

export default function Home() {
  return (
    <div className='flex flex-col gap-4 p-8'>
      <h1 className='text-2xl font-bold'>Login Form</h1>
      <LoginForm />
    </div>
  )
}
