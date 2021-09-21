import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";
import { Mongoose } from "mongoose";
import { compare } from "bcryptjs";
import initDB from "../../../helpers/initDB";
import User from "../../../models/User";

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //Connect to database;
        // const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
        initDB();
        //Get all users

        // const users = await client.db().collection("users");

        //validate email & password
        if (!credentials.email || !credentials.password) {
          throw new Error("Please provide an email and password", 400);
        }

        // check for user
        //Find user with the email
        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );
        console.log(user);

        if (!user) {
          throw new Error("Invalid credential", 401);
        }

        const checkPassword = await compare(credentials.password,result.hash_password  );
   
        //Incorrect password - send response
        if (!checkPassword) {
          // client.close();
          throw new Error("Invalid Credentials");
        }

        // send error if user is not found
        if (!user) {
          // client.close();
          throw new Error("No user found with the email");
        }

        // else send success response
        // client.close();
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn(user) {
      return user.userId && user.isActive === "1";
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
