import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      profile: async (profile) => {
        // console.log("profile, ", profile)
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      session.auth_token = token.auth_token;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.auth_token = account.id_token;
      }
      return token;
    }, },

  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
