import { user } from "@nextui-org/react";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const odbc = require("odbc");


const connectionString = "DSN=B4799;UID=VSAUSER;PWD=VSAUSER";

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },  
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        const connection = await odbc.connect(connectionString);
        const response = await connection.query("SELECT * FROM nai.USERS where USRPRF = ?", [credentials?.username.toUpperCase()]);

        const user = response[0];
        
        const passwordCorrect = (credentials?.password.toUpperCase() || '') == user.USRPWD.trim();

        if (passwordCorrect){
            return {
                id: user.CCUSTNUM,
                username: user.USRPRF,
            };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
