class MailSender {
  static async forgetPassword(user) {
    let email = global.app.mailer.email;

    return await email.send({
      template: 'forgetPassword',
      message: {
        to: user.email,
      },
      locals: {
        email: user.email,
        forgetPasswordToken: user.forgetPasswordToken,
      },
    });
  }
}

export default MailSender;