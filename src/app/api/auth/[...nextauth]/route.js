import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import {getFullName} from "@/lib/siteConfig";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      profile: async (profile) => {
        try {
          // Log the received profile for debugging
          console.log('Received profile:', profile);
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          };
        } catch (error) {
          console.error('Error in profile function:', error);
          throw new Error('Error parsing profile data');
        }
      },
      
    }),
    
  ],
  
  
  // Other options...
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };





