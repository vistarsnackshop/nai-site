import { NextApiRequest, NextApiResponse } from "next";

const odbc = require('odbc');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await odbc.connect('DSN=B4799;UID=VSAUSER;PWD=VSAUSER');
    const queryResult = await connection.query('SELECT * FROM page1_table');
    connection.close();

    res.status(200).json(queryResult);
  } catch (error) {
    console.error('ODBC Connection Error:', error);
    res.status(500).json({ error: 'Failed to fetch data for Page 1' });
  }
}
