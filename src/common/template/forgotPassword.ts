export const forgotPasswordEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0; background-color: #f4f4f4;">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; border: 1px solid #cccccc; border-spacing: 0; background-color: #ffffff; margin: 0 auto;">
                    <tr>
                        <td style="padding: 40px 30px 20px 30px; text-align: center;">
                            <h1 style="color: #333333; font-size: 24px; margin: 0;">Reset Your Password</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 30px;">
                            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">
                                Hi [User],
                            </p>
                            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 16px 0 0 0;">
                                We received a request to reset your password. Please use the following OTP to reset your password:
                            </p>
                            <p style="text-align: center; margin: 20px 0;">
                                <span style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; font-size: 24px; border-radius: 5px; letter-spacing: 2px;"{{otp}}</span>
                            </p>
                            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">
                                If you did not request a password reset, please ignore this email or contact support if you have questions.
                            </p>
                            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 16px 0 0 0;">
                                Thanks,
                                <br>The [Your Company] Team
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; background-color: #007bff; text-align: center; color: #ffffff; font-size: 14px;">
                            <p style="margin: 0;">&copy; [Year] [Your Company]. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`