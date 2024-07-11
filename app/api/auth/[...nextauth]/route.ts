//Import necessary modules and components
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { body, validationResult } from "express-validator"
const odbc = require("odbc");

// Define the connection string for the ODBC connection
const connectionString = process.env.CONNECTION_STRING;

// Define NextAuth handler function
const handler = NextAuth({
  // Session configuration
  session: {
    strategy: 'jwt', // Use JWT strategy for sessions
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
        
        // Check if the provided password matches the stored password (case insensitive)
        const passwordCorrect = (credentials?.password.toUpperCase() || '') == user.USRPWD.trim();
        
        // If password is correct, return user information for authentication
        if (passwordCorrect){
            return {
                id: user.CCUSTNUM, // User ID
                username: user.USRPRF, // Username
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
