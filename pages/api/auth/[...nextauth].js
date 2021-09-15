import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { compare } from "bcryptjs";
import { MongoClient } from "mongodb";

export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        //Connect to database;
        const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
        //Get all users
        const users = await client.db().collection("users");
        //Find user with the email
        const result = await users.findOne({ email: credentials.email});
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
        return { email: result.email };
      },
    }),
  ],
});
