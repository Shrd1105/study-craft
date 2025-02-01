import NextAuth, { DefaultSession, AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

// Define the shape of credentials
interface Credentials {
  email: string;
  password: string;
}

// Define our custom user type
interface UserType {
  id: string;
  name: string;
  email: string;
}

// Extend the built-in types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image?: string | null;
    }
  }

  // Extend but don't create circular reference
  interface User {
    id: string;
    name: string;
    email: string;
  }
}

// JWT type extension
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Credentials | undefined): Promise<UserType | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          await connectMongoDB();
          
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            return null;
          }

          // Return user data in the correct shape
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // Callback when JWT is created / updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    // Callback whenever session is checked
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 