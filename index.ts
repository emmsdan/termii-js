import axios from 'axios';

export class TermiiJs {
    private key: string;

    constructor(api_key: string) {
        this.key = api_key;
    }

    private base(url: string): string {
        return `https://api.ng.termii.com/api/${url}`;
    }

    private checkStatus(status: number): { success: boolean, message: string } {
        switch (status) {
            case 200:
                return {
                    success: true,
                    message: 'OK: Request was successful.',
                };
            case 400:
                return {
                    success: false,
                    message: 'Bad Request: Indicates that the server cannot or will not process the request due to something that is perceived to be a client error',
                };
            case 401:
                return {
                    success: false,
                    message: 'Unauthorized: No valid API key provided',
                };
            case 403:
                return {
                    success: false,
                    message: "Forbidden: The API key doesn't have permissions to perform the request.",
                };
            case 404:
                return {
                    success: false,
                    message: "Not Found: The requested resource doesn't exist.",
                };
            case 405:
                return {
                    success: false,
                    message: 'Method Not allowed: The selected HTTP method is not allowed',
                };
            case 422:
                return {
                    success: false,
                    message: 'Unprocessable entity: indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions',
                };
            case 429:
                return {
                    success: false,
                    message: 'Too Many Requests: Indicates the user has sent too many requests in a given amount of time',
                };
            default:
                return {
                    success: false,
                    message: "Server Errors: Something went wrong on Termii's end OR status was not returned",
                };
        }
    }

    public async balance(){
        try {
            const response = await axios.get(this.base(`get-balance?api_key=${this.key}`));
            const status = response.status;
            if (JSON.parse(response.data).success) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public async history() {
        try {
            const response = await axios.get(this.base(`sms/inbox?api_key=${this.key}`));
            const status = response.status;
            if (JSON.parse(response.data).success) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public historyStatus() {
        // Will be added later
    }

    public async status(phone_number: number, country_code: string) {
        try {
            const response = await axios.get(this.base(`insight/number/query?api_key=${this.key}&phone_number=${phone_number}&country_code=${country_code}`));
            const status = response.status;
            // There is a fix here
            // TODO: Fix
            if (JSON.parse(response.data).success || status === 400) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public async search(phone_number: number) {
        try {
            const response = await axios.get(this.base(`check/dnd?api_key=${this.key}&phone_number=${phone_number}`));
            const status = response.status;
            // There is a fix here
            // TODO: Fix
            if (JSON.parse(response.data).success || status === 404) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public async allSenderId() {
        try {
            const response = await axios.get(this.base(`sender-id?api_key=${this.key}`));
            const status = response.status;
            if (JSON.parse(response.data).success) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public senderIdStatus() {
        // Will be added later
    }

    public async submitSenderId(sender_id: string, use_case: string, company: string) {
        try {
            const response = await axios.post(this.base('sender-id/request'), {
                api_key: this.key,
                sender_id: sender_id,
                usecase: use_case,
                company: company,
            });
            const status = response.status;
            if (JSON.parse(response.data).success || status === 404) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public async sendMessage(to: number, from: string, sms: string, channel: string = 'generic', media: boolean = false, media_url: string | null = null, media_caption: string | null = null) {
        const type = 'plain';

        if (media == true && channel == 'whatsapp') {
            channel = 'whatsapp';

            const data = {
                api_key: this.key,
                to: to,
                from: from,
                type: type,
                channel: channel,
                media: JSON.stringify({
                    'media.url': media_url,
                    'media.caption': media_caption,
                }),
            };

            try {
                const response = await axios.post(this.base('sms/send'), data);
                const status = response.status;
                // There is a fix here
                // TODO: Fix
                if (JSON.parse(response.data).success || status === 400) {
                    return response.data;
                }
                return this.checkStatus(status);
            } catch (error) {
                return error
            }
        }

        const data = {
            api_key: this.key,
            to: to,
            from: from,
            sms: sms,
            type: type,
            channel: channel,
        };

        try {
            const response = await axios.post(this.base('sms/send'), data);
            const status = response.status;
            // There is a fix here
            // TODO: Fix
            if (JSON.parse(response.data).success || status === 400) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public async sendOTP(to: number, from: string, message_type: string, pin_attempts: number, pin_time_to_live: number, pin_length: number, pin_placeholder: string, message_text: string, channel: string = 'generic') {
        const data = {
            api_key: this.key,
            to: to,
            from: from,
            message_type: message_type,
            channel: channel,
            pin_attempts: pin_attempts,
            pin_time_to_live: pin_time_to_live,
            pin_length: pin_length,
            pin_placeholder: pin_placeholder,
            message_text: message_text,
        };

        try {
            const response = await axios.post(this.base('sms/otp/send'), data);
            const status = response.status;
            if (JSON.parse(response.data).success || status === 400) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public async sendVoiceOTP(to: number, pin_attempts: number, pin_time_to_live: number, pin_length: number) {
        const data = {
            api_key: this.key,
            phone_number: to,
            pin_attempts: pin_attempts,
            pin_time_to_live: pin_time_to_live,
            pin_length: pin_length,
        };

        try {
            const response = await axios.post(this.base('sms/otp/send/voice'), data);
            const status = response.status;
            if (JSON.parse(response.data).success || status === 400) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public async sendVoiceCall(to: number, code: number) {
        const data = {
            api_key: this.key,
            phone_number: to,
            code: code,
        };

        try {
            const response = await axios.post(this.base('sms/otp/call'), data);
            const status = response.status;
            if (JSON.parse(response.data).success || status === 400) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public async verifyOTP(pinId: string, pin: string) {
        const data = {
            api_key: this.key,
            pin_id: pinId,
            pin: pin,
        };

        try {
            const response = await axios.post(this.base('sms/otp/verify'), data);
            const status = response.status;
            if (JSON.parse(response.data).success || status === 400) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }

    public async sendInAppOTP(to: number, pin_attempts: number, pin_time_to_live: number, pin_length: number, pin_type: string) {
        const data = {
            api_key: this.key,
            phone_number: to,
            pin_type: pin_type,
            pin_attempts: pin_attempts,
            pin_time_to_live: pin_time_to_live,
            pin_length: pin_length,
        };

        try {
            const response = await axios.post(this.base('sms/otp/generate'), data);
            const status = response.status;
            if (JSON.parse(response.data).success || status === 400) {
                return response.data;
            }
            return this.checkStatus(status);
        } catch (error) {
            return error
        }
    }
}

export default TermiiJs
