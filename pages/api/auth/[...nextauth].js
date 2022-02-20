import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import User from "../../../models/user"
import dbConnect from "../../../config/dbConnect"

export default NextAuth({
  // Configure one or more authentication providers
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      async authorize(credentials, req) {
        console.log("in [...nextauth] credentials: ", credentials)

        dbConnect()

        const { email, password } = credentials

        if (!email || !password) {
          throw new Error("Please enter email or password")
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
          throw new Error("Invalid email or password")
        }

        // check if password is correct
        const isPasswordMatched = await user.comparePassword(password)

        if (!isPasswordMatched) {
          throw new Error("Invalid email or password")
        }

        return Promise.resolve(user)
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      user && (token.user = user)
      return Promise.resolve(token)
    },
    async session(session, token) {
      session.user = token.user
      return Promise.resolve(session)
    },
  },
})
