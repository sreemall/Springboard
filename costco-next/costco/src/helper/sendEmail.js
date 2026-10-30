
import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(name="", email="", messageData="") {
    //console.log("9999 .... Sender:", process.env.EMAIL_FROM, "To:", process.env.EMAIL_TO, " messageData: ", messageData);
    if (!email)
        email = process.env.EMAIL_TO;


    let html;

    if (Array.isArray(messageData)) {
        // Array: format as a list of products on sale
        const dataList = messageData
            .map(dataItem => `<li>${dataItem}</li>`)
            .join("");

        html = `
                <div style="text-align: left;">
                  <p>Hello ${name},</p>

                  <h2>Following Products are On Sale:</h2>
                  <ul>
                      ${dataList}
                  </ul>
                </div>
              `
    }
    else {
        // String: send the message as provided
        html = `<div style="text-align: left;">
                <p>Hello ${name || "there"},</p>
                <p>${messageData}</p>
                </div>`;
    }

    const { data, error } = await resend.emails.send({
      from: `Costco Products Price Tracking <${process.env.EMAIL_FROM}>`,
      to: [`${process.env.EMAIL_TO}`],
      subject: "Costco Products Price Tracking",
      html: html,
  });

  //   const { data, error } = await resend.emails.send({
  //   from: `Costco Products Price Tracking <${process.env.EMAIL_FROM}>`,
  //   to: [`${process.env.EMAIL_TO}`],
  //   subject: "Test email",
  //   html: `<p>${messageData}</p>`,
  // });

  if (error) {
    console.error("Failed to send email:", error);
    process.exitCode = 1;
    return;
  }

  //console.log("Email sent successfully:", data);
}

