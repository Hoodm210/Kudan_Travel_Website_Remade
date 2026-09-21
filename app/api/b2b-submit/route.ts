import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract text fields
    const companyName = formData.get("companyName") as string;
    const registrationNumber = formData.get("registrationNumber") as string;
    const businessType = formData.get("businessType") as string;
    const officialEmail = formData.get("officialEmail") as string;
    const officialPhone = formData.get("officialPhone") as string;
    const website = formData.get("website") as string;
    const country = formData.get("country") as string;
    const address = formData.get("address") as string;
    const representativeName = formData.get("representativeName") as string;
    const representativeTitle = formData.get("representativeTitle") as string;
    const representativeEmail = formData.get("representativeEmail") as string;
    const representativePhone = formData.get("representativePhone") as string;
    const estimatedVolume = formData.get("estimatedVolume") as string;
    const additionalNotes = formData.get("additionalNotes") as string;

    // Extract files
    const files = formData.getAll("files") as File[];
    const attachments = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Send Email via Resend
    const data = await resend.emails.send({
      from: "Kudan B2B Portal <onboarding@resend.dev>", // Replace with your verified domain email
      to: ["reservations@kudantravel.com"], // Replace with your team inbox
      subject: `New B2B Partner Application: ${companyName}`,
      html: `
        <h2>New B2B Partner Application Received</h2>
        <h3>1. Business Information</h3>
        <p><b>Company Name:</b> ${companyName}</p>
        <p><b>Registration/PAN:</b> ${registrationNumber}</p>
        <p><b>Business Type:</b> ${businessType}</p>
        <p><b>Official Email:</b> ${officialEmail}</p>
        <p><b>Official Phone:</b> ${officialPhone}</p>
        <p><b>Website:</b> ${website || "N/A"}</p>
        <p><b>Location:</b> ${address}, ${country}</p>

        <h3>2. Representative Details</h3>
        <p><b>Name:</b> ${representativeName} (${representativeTitle})</p>
        <p><b>Direct Email:</b> ${representativeEmail}</p>
        <p><b>Direct Phone / WhatsApp:</b> ${representativePhone}</p>

        <h3>3. Volume & Notes</h3>
        <p><b>Estimated Monthly Volume:</b> ${estimatedVolume}</p>
        <p><b>Additional Notes:</b> ${additionalNotes || "None"}</p>
      `,
      attachments: attachments,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit application." },
      { status: 500 }
    );
  }
}