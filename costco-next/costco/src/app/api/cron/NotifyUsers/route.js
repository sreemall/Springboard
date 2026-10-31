
import { NextResponse } from 'next/server';
import NotifyUsers from '@scripts/NotifyUsers';

export const maxDuration = 300;

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  try {
    // Trigger your standalone script logic
    console.log("9999 CRON STARTED");
    const result = await NotifyUsers();
    console.log("9999 CRON COMPLETED result: ", result);

    return NextResponse.json({ status: (result.success ? 200 : 500)},
                             { message: "Notify Users Completed" ,
                                ...result
                             });
  } 
  catch (error) {
    console.error('Costco cron failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
