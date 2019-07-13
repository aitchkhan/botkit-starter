const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
var phone_number = [];

module.exports = async function verification(number) {
	let verificationResult;

	if (number.length == 13) {
        phone_number.push(number);
        console.log(phone_number)
		try {
			verificationResult = await twilio.verify.services(VERIFICATION_SID)
			.verifications
            .create({ channel: 'sms', to: phone_number });
            return 'I have sent a code to your phone. Please enter code'
		} catch (e) {
            console.log("error : ", e);
            return 'some error occurred'
		}
	}
	else if (number.length == 6 && +number) {
		try {
            console.log(phone_number);
			verificationResult = await twilio.verify.services(VERIFICATION_SID)
			.verificationChecks
			.create({ code: number, to: phone_number[0] });
            if (!verificationResult.valid) {
                return 'You did not enter the correct code. Try again!'
            }
            phone_number = [];
            return 'Your phone has been verified. Thank you.'
		} catch (e) {
            console.log("error : ", e);
            return 'You did not enter the correct code. Try again!'
        }
    }
    return verificationResult;
}
