import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) return null

          const { username } = credentials

          return {
            id: '1',
            username,
            role: 'administrator',
            token: 'dummy_token',
          }
        } catch (e) {
          console.error(e)
          return null
        }
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      // console.log('_____________')
      // console.log('in authorized')
      // console.log('request: ', request)
      // console.log('auth: ', auth)
      // console.log('_____________')
      return !!auth
    },
    jwt({ token, trigger, session, account }) {
      // console.log('_____________')
      // console.log('in jwt')
      // console.log('token: ', token)
      // console.log('trigger: ', trigger)
      // console.log('session: ', session)
      // console.log('account: ', account)
      // console.log('_____________')
      return token
    },
    async session({ session, token }) {
      // console.log('_____________')
      // console.log('in session')
      // console.log('session: ', session)
      // console.log('token: ', token)
      // console.log('_____________')
      return session
    },
  },

  pages: {
    signIn: '/',
  },
})
