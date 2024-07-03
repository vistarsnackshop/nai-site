//this api is for fetching the data for the pack details (Case, )

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

async function fetchData(itemId:string) {
  //const searchParams = useSearchParams()!;
  try {
    const db = await odbc.connect(connectionString);
    const inventoryData = await db.query("select A.SKPUOMCD, trim(A.PCKDS) || '/' || A.SIZEDS, C.SUPNMDS, b.SUPMFGDS from renuatdta.ICITEM A join renuatdta.PRSUIM B on A.ITMID = B.ITMID and A.PRMSUPID = B.SUPID join renuatdta.PRSUPL C on B.SUPID = C.SUPID where A.ITMID = ?", [itemId]);
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

    try {
      const data = await fetchData(itemId);
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


