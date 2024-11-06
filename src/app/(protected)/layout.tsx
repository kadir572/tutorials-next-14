import LogoutButton from './LogoutButton'

type Props = {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: Props) {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='flex items-center justify-between'>
        <span>Header</span>
        <LogoutButton />
      </header>
      <main className='grow'>{children}</main>
      <footer>Footer</footer>
    </div>
  )
}
