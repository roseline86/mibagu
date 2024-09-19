import nodemailer from "nodemailer";

export default async function sendSubscriberEmail(
  email: string,
  subject: string = "New Blog Post Published",
  postTitle: string, // Title of the blog post
  postUrl: string, // URL to the blog post
  postExcerpt: string, // A short excerpt or description of the blog post
  coverImageUrl: string, // URL to the cover image of the blog post
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailData = {
    from: `"PrimeTech" <${process.env.SMTP_USER}>`, // Customize the sender name
    to: email,
    subject: subject, // Dynamic subject
    html: `
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            padding: 0;
            margin: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 10px;
          }
          p {
            color: #555555;
            line-height: 1.6;
          }
          .blog-cover {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 15px;
          }
          .footer {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #dddddd;
            text-align: center;
            color: #777777;
            font-size: 12px;
          }
          .footer a {
            color: #555555;
            text-decoration: none;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-align: center;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 20px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>${postTitle}</h1>
          <img src="${coverImageUrl}" alt="Blog Cover Image" class="blog-cover"/>
          <p>${postExcerpt}</p>
          <a href="${postUrl}" class="button">Read Full Post</a>
          <p>If you're not interested you can always <a href="${process.env.PUBLIC_SITE_URL}/unsubscribe?mail=${email}">Unsubscribe </a>
          </p>
          <div class="footer">
            <p>Sent from <a href="https://yourwebsite.com">PrimeTech</a></p>

          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailData);
}
