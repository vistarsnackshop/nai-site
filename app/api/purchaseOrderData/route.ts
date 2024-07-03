//this api is for fetching the data for the purchase orders card

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

async function fetchData(itemId:string, whsId:string) {
  //const searchParams = useSearchParams()!;
  try {
    const db = await odbc.connect(connectionString);
    const inventoryData = await db.query("select A.EXPRCTQT, B.RCECRCDT from renuatdta.TRRCLN A join renuatdta.TRRCHD B on A.ORDID = B.ORDID where A.RCLNSTCD = 'AP' and A.RVGWHSID = ? and A.ITMID = ? order by RCECRCDT", [whsId, itemId]);
    await db.close();
    return inventoryData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function GET(request:NextRequest) {
  const params = getParamsObject(request);
  const itemId = params.itemId;
  const whsId = params.whsId;

    try {
      const data = await fetchData(itemId, whsId);
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


