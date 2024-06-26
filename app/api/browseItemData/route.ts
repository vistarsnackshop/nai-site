
import { NextApiRequest, NextApiResponse } from "next";

const odbc = require('odbc');

const connectionString = 'DSN=B4799;UID=VSAUSER;PWD=VSAUSER';

async function fetchData() {
  try {
    const db = await odbc.connect(connectionString);
    const items = await db.query('select A.ITMID, A.ITEMDS, B.ITMCLSCD, B.PRMSUPID, B.PCKDS from nai.CCUSTITEM A join renuatdta.ICITEM B on A.ITMID = B.ITMID where STEREFDS = ? order by B.ITMID', ["80020"]);
    await db.close();
    return items;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function GET() {
    try {
      const data = await fetchData();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error in API handler:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }


