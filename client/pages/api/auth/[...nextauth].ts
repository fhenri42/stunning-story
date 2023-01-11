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
      const { session, token }: {session: any, token: any} = data;
      session.jwt = token.jwt;
      session.id = token.id;
      return session;
    },

    async jwt(data) {
      const { token, user, account } = data;
      const isSignIn = !!user;
      if (isSignIn) {
        const response = await fetch(
          `${serverRuntimeConfig.STRAPI_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`,
        );

        const dataR: any = await response.json();
        token.jwt = dataR.jwt;
        token.id = dataR.user.id;
        token.user = dataR.user;
      }
      return token;
    },
  },

});
