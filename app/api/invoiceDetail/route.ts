
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

async function fetchData(invoice:string) {
  const invoiceItemsQuery = "select BLLINNB, cast(BLORQT as integer), cast(BLSPOUQT as integer), ITMID, BLORIMDS, cast(case BLIVTPCD when 'CRD' then BLUPPUAM * -1 else BLUPPUAM end as numeric(7, 2)), case BLIVTPCD when 'CRD' then BLETPRAM * -1 else BLETPRAM end, case RESALEFL when 'N' then 'Y' else ' ' end from renuatdta.BLIVLN where BLID = ? and BLLNSTCD = 'BLD'";

  try {
    const db = await odbc.connect(connectionString);
    const invoiceItems = await db.query(invoiceItemsQuery, [invoice]);
    await db.close();
    return invoiceItems;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function GET(request:NextRequest) {
  const params = getParamsObject(request);
  const invoice = params.invoice;

    try {
      const data = await fetchData(invoice);
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


