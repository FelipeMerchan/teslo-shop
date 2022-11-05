import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

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
        console.log({ credentials })

        //TODO: Validar contra base de datos

        /* En el caso de que la autenticacion falle debemos retornar null */
        return { name: 'Felipe', correo: 'felipe@google.com', rol: 'admin' };
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  //Callbacks
  /* Por defecto Neth Auth trabaja con JWT, pero se puede cambiar. */
  callbacks: {
    
  },
};

export default NextAuth(authOptions);
