
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { useSearchParams } from "next/navigation";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // getMonth() returns 0-based month
const day = currentDate.getDate();
// Combine the year, month, and day into the format YYYYMMDD
const dateAsInteger = day + 100 * month + 10000 * year;

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
    const bids = await db.query('select distinct D.WHSID, D.WHSNMDS, C.BDID, C.BDDESC, A.STEREFDS from renuatdta.CMSHIP A join renuatdta.PCSHBD B on A.CTMSHIID = B.CTMSHIID join renuatdta.PCBDHD C on B.BDID = C.BDID and C.BDEFFTDT <= ? and C.BDEXPDT > ? join renuatdta.ICWHSE D on C.BDWHSID = D.WHSID where A.STEREFDS = ? order by D.WHSID, C.BDID',[dateAsInteger.toString(), dateAsInteger.toString(), custNum[0].CCUSTNUM]);
    await db.close();
    return bids;
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


