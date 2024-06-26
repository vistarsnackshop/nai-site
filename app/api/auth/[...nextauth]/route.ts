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
        const response = await connection.query("SELECT * FROM nai.USERS where USPRF=?", [credentials?.username.toUpperCase()]);
        console.log(response[0]);
        const user = response[0];

        const passwordCorrect = (credentials?.password.toUpperCase() || '') == user.USRPWD.trim();

        console.log({ passwordCorrect });

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
