//this api is for listing bid items and their prices for the browse bid items page
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

async function fetchData(username:string, bidId:string) {
  //const searchParams = useSearchParams()!;
  try {
    const db = await odbc.connect(connectionString);
    const custNum = await db.query('select CCUSTNUM from nai.USERS where USRPRF = ?', [username.toUpperCase()]);
    const items = await db.query('select distinct A.ITMID, B.ITEMDS, A.BDCUITAM from renuatdta.PCBDLN A join renuatdta.ICITEM B on A.ITMID=B.ITMID where A.BDID = ? and A.ITMID in (select ITMID from nai.CCUSTITEM where STEREFDS = ?) order by A.ITMID', [bidId, custNum[0].CCUSTNUM]);
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
  const bidId = params.bidid;
    try {
      const data = await fetchData(username, bidId);
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


