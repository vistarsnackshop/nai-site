//Import necessary modules and components
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from 'crypto'
import fs from 'fs';
import path from 'path';
const odbc = require("odbc");

// Define the connection string for the ODBC connection
const connectionString = process.env.CONNECTION_STRING;

// Function to create an MD5 hash
const md5Hash = (input:string) => {
  return crypto.createHash('md5').update(input).digest('hex');
};

// Function to log login details to a file
const logLoginDetails = (username:string) => {
  const date = new Date();
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  const logMessage = `${formattedDate} - User: ${username} logged in\n`;

  const logFilePath = path.join(process.cwd(), 'login_logs.txt');

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};

// Define NextAuth handler function
const handler = NextAuth({
  // Session configuration
  session: {
    strategy: 'jwt', // Use JWT strategy for sessions

    // 10 minutes - How long until an idle session expires and is no longer valid.
    maxAge: 10*60,
  },
  pages: {
    signIn: '/signin',
  },
  // Authentication providers setup  
  providers: [
    CredentialsProvider({
      credentials: {
        username: {}, // Define structure for username credential
        password: {}, // Define structure for password credential
      },
      // Authorization function for credentials provider
      async authorize(credentials?, req?) {
        // Sanitize and validate input
        const validationErrors = [];
        if (!credentials?.username || typeof credentials?.username !== 'string' || !credentials?.username.match(/^[a-zA-Z0-9]+$/)){
          validationErrors.push({ message: "Invalid username format" });
        }
        if (!credentials?.password || typeof credentials?.password !== 'string' || credentials?.password.length < 6) {
          validationErrors.push({ message: "Password must be at least 6 characters long" });
        }
        if (validationErrors.length > 0) {
          throw new Error(JSON.stringify(validationErrors));
        }

        // Establish connection to ODBC database
        const connection = await odbc.connect(connectionString);

        // Query database for user details based on provided username
        const response = await connection.query("SELECT * FROM nai.USERS where USRPRF = ?", [credentials?.username.toUpperCase()]);

        // Retrieve the user object from the database response
        const user = response[0];
        
        // Check if the provided password(Truncated MD5) matches the stored password (case insensitive, MD5 Hash)
        const passwordCorrect = (md5Hash(credentials?.password.toLowerCase() as string).substring(0,10)|| '') == user.USRPWD.trim();
        
        // If password is correct, return user information for authentication
        if (passwordCorrect){
          logLoginDetails(user.USRPRF);
            return {
                id: user.CCUSTNUM, // User ID
                name: user.USRPRF, // Username
            };
        }
        // If password is incorrect, return null (authentication failed)
        return null;
      },
    }),
  ],
});

// Export the handler as GET and POST for use in Next.js API routes
export { handler as GET, handler as POST };
