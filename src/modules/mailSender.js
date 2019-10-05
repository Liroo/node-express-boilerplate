class MailSender {
  static async forgetPassword(user) {
    let mailData = {
      to: user.email,
      subject: `Forget password`,
      text: `Here is your token: ${user.forgetPasswordToken}`,
    };

    return await this.send(mailData);
  }

  static async send(mailData) {
    let transporter = global.app.mailer.transporter;

    let mailInfo = await transporter.sendMail(Object.assign(mailData, {
      from: global.env.mailer.from,
    }));

    return mailInfo;
  }
}

export default MailSender;