import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

dotenv.config();

class MailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        } as SMTPTransport.Options);
    }

    async sendActivationMail(email: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Account activation ' + process.env.CLIENT_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>To activate your profile, follow the link: </h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        });
    }

    async sendVerificationCodeMail(email: string, code: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Verification code',
            text: '',
            html:
                `
                    <div>
                        <h1>To reset your password, enter this code:</h1>
                        <div>${code}</div>
                    </div>
                `
        })
    }
}

export default new MailService();