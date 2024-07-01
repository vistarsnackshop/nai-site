//this api is for listing the bid items for the specified opco from browse by operating company

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

async function fetchData(username:string, whsId:string) {
  //const searchParams = useSearchParams()!;
  try {
    const db = await odbc.connect(connectionString);
    const custNum = await db.query('select CCUSTNUM from nai.USERS where USRPRF = ?', [username.toUpperCase()]);
    const items = await db.query("select distinct A.ITMID, B.ITEMDS from renuatdta.PCBDLN A join nai.CCUSTITEM B on A.ITMID = B.ITMID where B.STEREFDS = ? and A.BDID in (select C.BDID from renuatdta.CMSHIP A join renuatdta.PCSHBD B on A.CTMSHIID = B.CTMSHIID join renuatdta.PCBDHD C on B.BDID = C.BDID and C.BDEFFTDT <= ? and C.BDEXPDT > ? where A.STEREFDS = ? and C.BDWHSID = ?)", [custNum[0].CCUSTNUM,dateAsInteger, dateAsInteger, custNum[0].CCUSTNUM, whsId]);
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
  const whsId = params.whsid;
    try {
      const data = await fetchData(username, whsId);
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


