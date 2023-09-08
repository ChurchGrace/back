import nodemailer from 'nodemailer';

interface IEmailOptions {
  to: string;
  subject: string;
  text: string;
}

const sendEmail = async (options: IEmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SEND_EMAIL_HOST,
    port: 2525,
    auth: {
      user: process.env.SEND_EMAIL_USER,
      pass: process.env.SEND_EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"Grace" <grace@example.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
  });
};

export default sendEmail;
