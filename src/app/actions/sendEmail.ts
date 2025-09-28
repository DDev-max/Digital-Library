'use server'

import type { FormFields } from 'app/Order/[book]/formSubmit'
import nodemailer from 'nodemailer'

export async function sendEmail(formData: Omit<FormFields, 'coordinates'>) {
  const { book, email, name } = formData

  if (!name || !email || !book) return

  const bookCode = book.slice(0, 3).toUpperCase()

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USERNAME,
      to: email,
      bcc: process.env.GMAIL_USERNAME,
      subject: `Your order for the book ${book}`,
      html: `
      <div style="background: #cbc2ee">
        <div style="background: #110a2b; color: white; padding: 1rem;">
          <h1 style="display: inline">Mark My Book</h1>
        </div>

        <div style="padding: 0 1rem 1rem 1rem">
          <p style="font-size:1.4rem"> ${name}, you have successfully ordered the book "<i>${book}</i>". We will contact you once
            we have received it so that you can pick it up at the nearest store.</p>
          <p style="font-size:1.4rem">This is the estimated final price; please note that it may change after taxes.</p>

          <table style="width: 65%; margin-right: auto; margin-left: auto; background: #9381da; font-size: 1.2rem">
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Quantity</th>
                <th>Unit price</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: #cbc2ee; text-align:center">
                <td>${book}</td>
                <td>${bookCode}</td>
                <td>1</td>
                <td>$7.99</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="background: #cbc2ee; text-align:center; font-weight: bold">
                <td colspan="3">Total</td>
                <td>$7.99</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}
