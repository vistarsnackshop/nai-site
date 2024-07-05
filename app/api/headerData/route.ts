//Api/Fetching data for the operating companies page after browsing by item 

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { useSearchParams } from "next/navigation";

const getParamsObject = (request: NextRequest): { [key: string]: string } => {
  const params: { [key: string]: string } = {};
  for (const [key, val] of request.nextUrl.searchParams.entries()) {
    params[key] = val;
  }
  return params;
};

const odbc = require('odbc');

const connectionString = 'DSN=B4799;UID=VSAUSER;PWD=VSAUSER';

async function fetchData(username:string) {
  //const searchParams = useSearchParams()!;
  try {
    const db = await odbc.connect(connectionString);
    const custNum = await db.query('select CCUSTNUM from nai.USERS where USRPRF = ?', [username.toUpperCase()]);
    const headerInfo = await db.query("select SPNMDS, STEREFDS from renuatdta.CMNATL where STEREFDS = ?", [custNum[0].CCUSTNUM]);
    await db.close();
    return headerInfo;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function GET(request:NextRequest) {
  const params = getParamsObject(request);
  const username = params.username;
    try {
      const data = await fetchData(username);
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


