import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utilities/mailer";
import { tokenType } from "@/types/enums";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check if user with this email already exists
    if (await User.findOne({ email })) {
      return NextResponse.json(
        { message: "This email is already taken by a user. Try to login." },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = new User({ username, email, password: hashedPassword });
    const savedUser = await user.save();

    // send verification mail
    await sendEmail(email, tokenType.VERIFY_USER, savedUser._id);

    return NextResponse.json(
      { message: "User created successfully", savedUser },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
