import { NextApiRequest, NextApiResponse } from "next";
import odbc from 'odbc'; // Import 'odbc' package from global npm installation

const db = require("odbc");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let { username, password } = req.body;

  // Ignore the case of username and password
  username = username.toUpperCase();
  password = password.toUpperCase();

  try {
    // Establish ODBC connection to your database
    const connection = await odbc.connect('DSN=B4799;UID=VSAUSER;PWD=VSAUSER');
     
    // Query database for user based on username
    const user = await db.query("SELECT CCUSTNUM, PROITMONLY, USRPWD FROM nai.USERS WHERE USRPRF = ?", [username]);

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
