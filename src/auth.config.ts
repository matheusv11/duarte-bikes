import type { NextAuthConfig } from 'next-auth';

const publicLoggedPath = ["/"]
const publicUnloggedPath = ["/", "/login", "/register"]
// const adminPrivatePath = ["/admin"]
// const userPrivatePath = ["/user"]

export const authConfig = {
  // theme: {
  //   logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  // },
  pages: {
    signIn: '/login',
  },
  basePath: "/auth",
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLogged = !!auth?.user;
      
      if(!isLogged && !publicUnloggedPath.includes(nextUrl.pathname)) return false;
      if(isLogged && publicLoggedPath.includes(nextUrl.pathname)) return true;

      if(auth?.user.kind === 'admin' && !nextUrl.pathname.startsWith('/admin') ) {
        return Response.redirect(new URL('/admin', nextUrl)); 
      }
      else if(auth?.user.kind === 'user' && !nextUrl.pathname.startsWith('/user') ) {
        return Response.redirect(new URL('/user', nextUrl));
      }

      return true;
    },
    jwt({ token, user, trigger, session }) {
      if(user?.id) {
        token.id = user.id
        token.kind = user.kind
      }
      if (trigger === "update") token.name = session.user.name
      return token
    },

    session({ session, token, user }) {
      session.user.id = token.id
      session.user.kind = token.kind
      return session;
    },
  },
} satisfies NextAuthConfig;
