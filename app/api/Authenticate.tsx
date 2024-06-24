//This component pulls username and password from database and authenticates sign in

import { NextApiRequest, NextApiResponse } from "next";
import odbc from 'odbc'; //import 'odbc' package from global npm installation

const db = require("odbc");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let { username, password } = req.body;

  //ignore the case of username and password
  username = username.toUpperCase();
  password = password.toUpperCase();

  try {
    // Establish ODBC connection to your database
    const connection = await odbc.connect('DSN=B4799;UID=VSAUSER;PWD=VSAUSER');
     
    const user = await db.query("select CCUSTNUM, PROITMONLY from nai.USERS where USRPRF = 'username'", [username]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Example: Compare hashed password (stored in database) with input password
    const isPasswordMatch = password === db.query("select USRPWD from nai.USERS where USRPWD = 'password'", [username]);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Authentication successful
    res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
