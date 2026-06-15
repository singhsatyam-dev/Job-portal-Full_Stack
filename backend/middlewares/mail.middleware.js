import nodemailer from "nodemailer";

export const sendConfirmationMail = async (toEmail, jobTitle) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"CareerForge"`,
      to: toEmail,
      subject: "Job Application Confirmation",
      html: `
        <h2>Application Submitted Successfully</h2>
        <p>You have successfully applied for <b>${jobTitle}</b>.</p>
        <p>Our team will contact you if shortlisted.</p>
        <br/>
        <p>Regards,<br/>Job Portal Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", toEmail);
  } catch (error) {
    console.error("Email error:", error.message);
  }
};
