//this api is for listing bid items and their prices for the browse bid items page
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { useSearchParams } from "next/navigation";

// Function to extract query parameters from the request
const getParamsObject = (request: NextRequest): { [key: string]: string } => {
  const params: { [key: string]: string } = {};
  for (const [key, val] of request.nextUrl.searchParams.entries()) {
    params[key] = val;
  }
  return params;
};

const odbc = require('odbc');

const connectionString = process.env.CONNECTION_STRING;

// Function to fetch bid items data from the database
async function fetchData(username:string, bidId:string) {
  // Query to fetch customer number
  const ccnumQuery = 'select CCUSTNUM from nai.USERS where USRPRF = ?'; // Constant query statement for SQL injection prevention
  const ccnumParams = [username.toUpperCase()]

  // Query to fetch bid items
  const itemsQuery = 'select distinct A.ITMID, B.ITEMDS, A.BDCUITAM from renuatdta.PCBDLN A join renuatdta.ICITEM B on A.ITMID=B.ITMID where A.BDID = ? and A.ITMID in (select ITMID from nai.CCUSTITEM where STEREFDS = ?) order by A.ITMID'
  try {
    // Connect to the database
    const db = await odbc.connect(connectionString);

    // Execute the query to fetch customer number
    const custNum = await db.query(ccnumQuery, ccnumParams);

    // Execute the query to fetch bid items
    const items = await db.query(itemsQuery, [bidId, custNum[0].CCUSTNUM]);

     // Close the database connection
    await db.close();

    // Return the fetched items
    return items;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function GET(request:NextRequest) {
  // Extract query parameters from the request
  const params = getParamsObject(request);
  const username = params.username;
  const bidId = params.bidid;
    try {
      // Fetch data using the extracted parameters
      const data = await fetchData(username, bidId);

      // Return the fetched data as a JSON response
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error in API handler:', error);
      // Return an error response in case of failure
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }


