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

const connectionString = process.env.CONNECTION_STRING;

async function fetchData(username:string, itemId:string) {
  const ccnumQuery = 'select CCUSTNUM from nai.USERS where USRPRF = ?';
  const ccnumParams = [username.toUpperCase()];
  const itemsQuery = "select A.WHSID, B.WHSNMDS from renuatdta.ICWHIM A join renuatdta.ICWHSE B on A.WHSID=B.WHSID join nai.CCUSTWHS C on A.WHSID=C.WHSID where A.ITMID = ? and A.WHISTSCD <> 'I' and C.STEREFDS = ?"
  try {
    const db = await odbc.connect(connectionString);
    const custNum = await db.query(ccnumQuery, ccnumParams);
    const items = await db.query(itemsQuery, [itemId, custNum[0].CCUSTNUM]);
    await db.close();
    return items;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function GET(request:NextRequest) {
  const params = getParamsObject(request);
  const username = params.username;
  const itemId = params.itemId;
    try {
      const data = await fetchData(username, itemId);
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

