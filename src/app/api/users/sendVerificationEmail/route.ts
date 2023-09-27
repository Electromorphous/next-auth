import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utilities/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, emailType, userId } = reqBody;

    // send verification mail
    await sendEmail(email, emailType);

    return NextResponse.json(
      { message: "Verification email has been sent" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
