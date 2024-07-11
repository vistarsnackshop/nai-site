
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

async function fetchData(username:string, whsId:string, itemId:string, startDate:string, endDate:string) {
  const ccnumQuery = 'select CCUSTNUM from nai.USERS where USRPRF = ?';
  const ccnumParams = [username.toUpperCase()];
  const itemsQuery = "select A.AACMSPID, B.SPNMDS, A.HSBLID, A.HSIVCDT, case C.BLIVTPCD when 'CRD' then C.IVCNETAM * -1 else C.IVCNETAM end from renuatdta.IHICHS A join renuatdta.CMSHIP B on A.AACMSPID = B.CTMSHIID join renuatdta.BLIVHD C on A.HSBLID = C.BLID where A.AAWHSID = ? and A.ITMID = ? and A.HSIVCDT >= ? and A.HSIVCDT <= ? and A.AASTRFDS = ? order by A.HSIVCDT desc";

  try {
    const db = await odbc.connect(connectionString);
    const custNum = await db.query(ccnumQuery, ccnumParams);
    const items = await db.query(itemsQuery, [whsId, itemId, startDate, endDate, custNum[0].CCUSTNUM]);
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
  const whsId = params.whsId;
  const itemId = params.itemId;
  const startDate = params.startDate;
  const endDate = params.endDate;
    try {
      const data = await fetchData(username, whsId, itemId, startDate, endDate);
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


