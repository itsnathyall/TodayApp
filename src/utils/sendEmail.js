import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const mailOptions = {
    from: '"Test Sender" <test@example.com>',
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info)); // Logs preview link

    return info; // Make sure to return the email info
  } catch (error) {
    console.error("Email failed to send:", error);
    return null; // Return null in case of an error
  }
};

export default sendEmail;

