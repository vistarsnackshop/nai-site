import { NextRequest } from "next/server"; // Importing NextRequest for server-side handling

// Function to convert request URL search params to an object
const getParamsObject = (request: NextRequest): { [key: string]: string } => {
  const params: { [key: string]: string } = {};
  // Iterate through each key-value pair in the search params
  for (const [key, val] of request.nextUrl.searchParams.entries()) {
    params[key] = val; // Assign each param key to its value in the params object
  }
  return params; // Return the params object
};

const odbc = require('odbc'); // Import ODBC module for database connectivity

const connectionString = 'DSN=B4799;UID=VSAUSER;PWD=VSAUSER'; // Database connection string

// Function to fetch data from the database based on username
async function fetchData(username: string) {
  try {
    const db = await odbc.connect(connectionString); // Connect to the database
    const custNum = await db.query('select CCUSTNUM from nai.USERS where USRPRF = ?', [username.toUpperCase()]); // Query for customer number based on username
    const items = await db.query('select A.ITMID, A.ITEMDS, B.ITMCLSCD, B.PRMSUPID, B.PCKDS from nai.CCUSTITEM A join renuatdta.ICITEM B on A.ITMID = B.ITMID where STEREFDS = ? order by B.ITMID', [custNum[0].CCUSTNUM]); // Query items based on customer number
    await db.close(); // Close the database connection
    return items; // Return the fetched items
  } catch (error) {
    console.error('Error fetching data:', error); // Log any errors that occur during data fetching
    return []; // Return an empty array in case of error
  }
}

// Handler function for HTTP GET request
export async function GET(request: NextRequest) {
  const params = getParamsObject(request); // Get URL parameters from the request
  const username = params.username; // Extract username from parameters
  try {
    const data = await fetchData(username); // Fetch data from the database based on username
    // Return fetched data as JSON response with status 200 (OK)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json', // Specify response content type as JSON
      },
    });
  } catch (error) {
    console.error('Error in API handler:', error); // Log any errors that occur in the API handler
    // Return error message as JSON response with status 500 (Internal Server Error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json', // Specify response content type as JSON
      },
    });
  }
}