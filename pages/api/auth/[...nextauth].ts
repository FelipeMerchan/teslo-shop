import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

import { dbUsers } from '../../../database';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo', type: 'email' , placeholder: 'correo@google.com' },
        password: { label: 'Contraseña', type: 'password' , placeholder: 'Contraseña' },
      },
      async authorize(credentials) {
        /* Si es exitosa la autenticacion retornaremos un objeto */
        console.log({ credentials });

        //TODO: Validar contra base de datos

        /* En el caso de que la autenticacion falle debemos retornar null */
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // Custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  // Callbacks
  /* Por defecto Neth Auth trabaja con JWT, pero se puede cambiar. */
  callbacks: {
    /* Primero se genera el JWT en el callback jwt y luego es pasado al
    a la sesion con el callback session: */
    async jwt({ token, account, user }) {
      if (account) {
        /* Asi podemos modificar el payload del JWT, agregando propiedades al token
        que luego podemos encontrar en el JWT que se cree: */
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
            break;
          case 'credentials':
            token.user = user;
            break;
          default:
            break;
        }
      }

      return token;
    },

    /* Despues de generado el JWT en el callback jwt este se pasa a la sesion: */
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }
  },
};

export default NextAuth(authOptions);
