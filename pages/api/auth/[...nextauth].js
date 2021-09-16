import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";


const options = {
  providers: [
     
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
           //Connect to database;
        const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
        //Get all users
        const users = await client.db().collection("users");
        //Find user with the email
        const result = await users.findOne({ email: credentials.email});
        console.log(result);

            // send error if user is not found
        if (!result) {
          client.close();
          throw new Error("No user found with the email");
        }
        // check hashed password with DB
    
        const checkPassword = await compare(credentials.password,result.hash_password  );
   
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error("Invalid Credentials");
        }
        // else send success response
        client.close();
        return result;
    
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn(user) {
      return user.userId && user.isActive === '1';
    },
    async session(session, token) {
      session.user = token.user;
      return session;
    },
    async jwt(token, user) {
      if (user) token.user = user;
      return token;
    },
  },

  database: `${process.env.MONGODB_URI}`,
};

export default (req, res) => NextAuth(req, res, options);