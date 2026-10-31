
import { NextResponse } from 'next/server';
// import { PopulateCostcoData } from '../../../../../scripts/PopulateCostcoData';
import PopulateCostcoData from '@scripts/PopulateCostcoData';

export const maxDuration = 300;

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  try {
    // Trigger your standalone script logic
    console.log("9999 CRON STARTED");
    await PopulateCostcoData();
    console.log("9999 CRON COMPLETED");

    return NextResponse.json({ success: true, message: "Costco Data Populated!" });
  } 
  catch (error) {
    console.error('Costco cron failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// import { execFile } from "child_process";
// import { promisify } from "util";
// import path from "path";

// const execFileAsync = promisify(execFile);

// export async function GET(request) {
//   const authHeader = request.headers.get("authorization");

//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   try {
//     const scriptPath = path.join(
//       process.cwd(),
//       "scripts",
//       "populate_costco_data.js"
//     );

//     const { stdout, stderr } = await execFileAsync(
//       process.execPath,
//       [scriptPath],
//       { timeout: 300000 }
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Costco data populated successfully",
//       output: stdout,
//       errors: stderr
//     });
//   } catch (error) {
//     console.error("Costco cron failed:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message
//       },
//       { status: 500 }
//     );
//   }
// }
