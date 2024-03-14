import type { NextAuthConfig } from 'next-auth';

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
      if (!isLogged && nextUrl.pathname !== '/') return false;
      const isAdmin = auth?.user.kind === 'admin';

      if(isAdmin &&  nextUrl.pathname.startsWith('/user') || nextUrl.pathname.startsWith('/login') ) {
        return Response.redirect(new URL('/admin', nextUrl)); 
      } else if (!isAdmin && nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/user', nextUrl));
      }

      return true;
    },
    jwt({ token, user, trigger, session }) {
      if(user) {
        token.id = user.id
        token.kind = user.kind  // Tipar
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
