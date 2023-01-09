import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default NextAuth({

  providers: [
    GoogleProvider({
      clientId: serverRuntimeConfig.GOOGLE_CLIENT_ID,
      clientSecret: serverRuntimeConfig.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {

    async session({ session, token, user }) {
      session.jwt = token.jwt;
      session.id = token.id;
      return session;
    },

    async jwt({ token, user, account }) {
      const isSignIn = !!user;
      if (isSignIn) {
        const response = await fetch(
          `${serverRuntimeConfig.STRAPI_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`,
        );
        const data = await response.json();
        token.jwt = data.jwt;
        token.id = data.user.id;
      }
      return token;
    },
  },

});
