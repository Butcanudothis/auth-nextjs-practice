import nodemailer from 'nodemailer'
import User from '@/models/userModels'
import bcryptjs from 'bcryptjs'




export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });
        // console.log(process.env.MAILTRAP_USER)
        const mailOptions = {
            from: 'dummy@email.com',
            to: email,
            subject: emailType === 'VERIFY'? "Verification required" : " Reset your Password",
            html: `<p>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to
            ${emailType === 'VERIFY'? "Verify your email" : " Reset your Password"}
            </p>`
        }
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}