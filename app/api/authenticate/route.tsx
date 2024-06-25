"use server"
import { NextApiRequest, NextApiResponse } from "next";
import odbc from 'odbc'; // Import 'odbc' package from global npm installation
import bodyParser from 'body-parser';
import { parse } from "path";

// Middleware wrapper to convert Express-style middleware to Next.js API route compatible middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const db = require("odbc");
const parseJson = bodyParser.json();

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let { username, password } = req.body;

  await runMiddleware(req, res, parseJson);
  console.log("Request Body:", req.body);

  // Ignore the case of username and password
  username = username.toUpperCase();
  password = password.toUpperCase();

  try {
    // Establish ODBC connection to your database
    console.log("Attempting to connect to database...");
    const connection = await odbc.connect('DSN=B4799;UID=VSAUSER;PWD=VSAUSER');
     
    // Query database for user based on username
    console.log("Attempting to query to database...");
    const user = await db.query("SELECT CCUSTNUM, PROITMONLY, USRPWD FROM nai.USERS WHERE USRPRF = ?", [username]);
    console.log("Query result:", user);
    
    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare plain text password (NOT RECOMMENDED for production)
    const storedPassword = user[0].USRPWD; // Assuming USRPWD is the column name for password
    if (password !== storedPassword.toUpperCase()) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Authentication successful
    res.status(200).json({ message: "Authentication successful" });

    // Close the database connection
    await connection.close();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal Server Error-API" });
  }
}
