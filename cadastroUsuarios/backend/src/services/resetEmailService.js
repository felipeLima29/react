import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    authentication:'plain',
    auth: {
        user: process.env.EMAIL_RESET,
        pass: process.env.PASSWORD_RESET
    },
});

async function sendResetPassword(to, cod) {
    await transporter.sendMail({
        from: '"Felipe" <Site CRUD>',
        to: to,
        subject: "Código para recuperação de email",
        text: "Olá!",
        html: `
            <h2>Insira esse código para recuperar sua senha:</h2>
            <p>${cod}</p>
        `, // HTML body
    });
};

export default sendResetPassword;