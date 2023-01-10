import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const scopes = ['identify'].join(' ');
export const authOptions = {
  secret: serverRuntimeConfig.SECRET,
  providers: [
    GoogleProvider({
      clientId: serverRuntimeConfig.GOOGLE_CLIENT_ID,
      clientSecret: serverRuntimeConfig.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: scopes } },
    }),
  ],
};

export default NextAuth({
  ...authOptions,
  session: { strategy: 'jwt' },
  callbacks: {
    async session(data) {
      const { session, token, user } = data;
      session.jwt = token.jwt;
      session.id = token.id;
      return session;
    },

    async jwt(data) {
      const { token, user, account } = data;
      // console.log('jwt', data);
      const isSignIn = !!user;
      // console.log('isSignIn', isSignIn);
      if (isSignIn) {
        console.log(account);
        const response = await fetch(
          `${serverRuntimeConfig.STRAPI_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`,
        );

        const data = await response.json();
        token.jwt = data.jwt;
        token.id = data.user.id;
        token.user = data.user;
      }
      return token;
    },
  },

});
