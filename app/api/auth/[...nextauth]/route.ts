import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Missing username or password');
        }

        // Connect to MongoDB
        const client = new MongoClient(process.env.MONGODB_URI as string);
        
        try {
          await client.connect();
          const db = client.db();
          const adminCollection = db.collection('admins');
          
          // Find admin by username
          const admin = await adminCollection.findOne({
            username: credentials.username,
            password: credentials.password
          });
          
          if (!admin) {
            throw new Error('No admin found with this username or password');
          }
          
          
          
          // If everything is correct, return admin data
          return {
            id: admin._id.toString(),
            name: admin.username,
            role: 'admin'
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        } finally {
          await client.close();
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.id = token.sub as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };