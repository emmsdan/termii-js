<p align="center">
    <img title="Termii" src="https://developers.termii.com/termii-logo.svg"/>
</p>

# Termii-JS Laravel Package

Termii-JS is a Laravel package that simplifies setting up, testing, and managing your Termii integration directly in your Laravel application.

[![Total Downloads](https://img.shields.io/packagist/dt/zeevx/Termii-JS.svg?style=flat-square)](https://packagist.org/packages/emmsdan/Termii-JS)

## Installation

You can install the package via npm:

```bash
npm install @emmsdan/termii-js
```
You can install the package via yarn:

```bash
yarn add @emmsdan/termii-js
```

## Usage
Declare an Instance of the TermiiJs Class
You can create an instance of the TermiiJs class by providing your Termii API key:

```ts
import { TermiiJs } from '@emmsdan/termii-js';

const termii = new TermiiJs("YOUR-TERMII-API-KEY");
```

### Check Your Termii Balance
You can check your Termii account balance by calling the balance method:

```typescript
termii.balance()
.then((result) => {
console.log(result);
})
.catch((error) => {
console.error(error);
});
```

### Reports for Messages Sent
To retrieve reports for messages sent across SMS, voice, and WhatsApp channels, use the history method:

```typescript
termii.history()
.then((result) => {
console.log(result);
})
.catch((error) => {
console.error(error);
});
```

### Detect If a Number Is Fake or Ported
You can check if a phone number is fake or has ported to a new network using the status method:

```typescript
const phoneNumber = 1234567890; // Replace with the phone number you want to check
const countryCode = 'US'; // Replace with the appropriate country code

termii.status(phoneNumber, countryCode)
.then((result) => {
console.log(result);
})
.catch((error) => {
console.error(error);
});
```

### Verify Phone Numbers
Verify phone numbers and automatically detect their status with the search method:

```typescript
const phoneNumber = 1234567890; // Replace with the phone number you want to verify

termii.search(phoneNumber)
.then((result) => {
console.log(result);
})
.catch((error) => {
console.error(error);
});
```

### Retrieve Sender ID Status
You can retrieve the status of all registered sender IDs using the allSenderId method:

```typescript
termii.allSenderId()
.then((result) => {
console.log(result);
})
.catch((error) => {
console.error(error);
});
```

### Request a New Sender ID
To request a new sender ID, use the submitSenderId method:

```typescript
const senderId = 'NEW_SENDER_ID'; // Replace with the sender ID you want to request
const useCase = 'SAMPLE_USE_CASE'; // Replace with the intended use case
const company = 'YOUR_COMPANY_NAME'; // Replace with your company name

termii.submitSenderId(senderId, useCase, company)
.then((result) => {
console.log(result);
})
.catch((error) => {
console.error(error);
});
```

### Send Messages
Send messages using the sendMessage method:

```typescript
const to = 1234567890; // Replace with the recipient's phone number
const from = 'SENDER_ID'; // Replace with your sender ID
const sms = 'Hello, World!'; // Replace with your message content

termii.sendMessage(to, from, sms)
.then((result) => {
console.log(result);
})
.catch((error) => {
console.error(error);
});
```

### Send OTP
Send one-time passwords (OTP) with the sendOTP method:

```typescript
const to = 1234567890; // Replace with the recipient's phone number
const from = 'SENDER_ID'; // Replace with your sender ID
const messageType = 'TEXT'; // Replace with the desired message type
const pinAttempts = 3; // Replace with the number of OTP attempts allowed
const pinTimeToLive = 3600; // Replace with the OTP expiration time in seconds
const pinLength = 6; // Replace with the OTP length
const pinPlaceholder = 'PIN_PLACEHOLDER'; // Replace with a placeholder for the OTP
const messageText = 'Your OTP is: PIN_PLACEHOLDER'; // Replace with the message text

termii.sendOTP(to, from, messageType, pinAttempts, pinTimeToLive, pinLength, pinPlaceholder, messageText)
.then((result) => {
console.log(result);
})
.catch((error) => {
console.error(error);
});
```

### Send Voice OTP
Send voice OTP using the sendVoiceOTP method:

```typescript
const to = 1234567890; // Replace with the recipient's phone number
const pinAttempts = 3; // Replace with the number of OTP attempts allowed
const pinTimeToLive = 3600; // Replace with the OTP expiration time in seconds
const pinLength = 6; // Replace with the OTP length

termii.sendVoiceOTP(to, pinAttempts, pinTimeToLive, pinLength)
.then((result) => {
console.log(result);
})
.catch((error) => {
console.error(error);
});
```

### Send Voice Call
Send voice calls using the sendVoiceCall method:

```typescript
const to = 1234567890; // Replace with the recipient's phone number
const code = 1234; // Replace with the code for the voice call

termii.sendVoiceCall(to, code)
.then((result) => {
console.log(result);
})
.catch((error) => {
console.error(error);
});
```

### OTP Validation
You can verify or validate OTP using the verifyOTP method:

```typescript
    const pinId = 'PIN_ID'; // Replace with the PIN ID
    const pin = '123456'; // Replace with the OTP to validate
    
    termii.verifyOTP(pinId, pin)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error(error);
        });
```

### Send In-App OTP
Send In-App OTP using the sendInAppOTP method:

```typescript
    const to = 1234567890; // Replace with the recipient's phone number
    const pinAttempts = 3; // Replace with the number of OTP attempts allowed
    const pinTimeToLive = 3600; // Replace with the OTP expiration time in seconds
    const pinLength = 6; // Replace with the OTP length
    const pinType = 'numeric'; // Replace with the type of In-App OTP
    
    termii.sendInAppOTP(to, pinAttempts, pinTimeToLive, pinLength, pinType)
        .then((result) => {
        console.log(result);
        })
        .catch((error) => {
        console.error(error);
    });
```


## Security
If you discover any security-related issues, please email adamsohiani@gmail.com instead of using the issue tracker.


## Credits

-   [Emmanuel Daniel](https://github.com/emmsdan)
-   [All Contributors](../../contributors)

## License

The MIT License (MIT)