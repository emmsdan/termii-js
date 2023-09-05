import axiosInstance from 'axios';
const axios = axiosInstance.create({
    baseURL:'https://api.ng.termii.com/api/',
})
export class TermiiJs {
    private key: string;

    constructor(api_key: string) {
        this.key = 'api_key';
    }

    private base(url: string): string {
        return `${url}`;
    }

    private checkStatus({status, data}: { status: number, data?: any }): { success: boolean, message: string, data?: any } {
        switch (status) {
            case 200:
                return {
                    data,
                    success: true,
                    message: 'OK: Request was successful.',
                };
            case 400:
                return {
                    data,
                    success: false,
                    message: 'Bad Request: Indicates that the server cannot or will not process the request due to something that is perceived to be a client error',
                };
            case 401:
                return {
                    data,
                    success: false,
                    message: 'Unauthorized: No valid API key provided',
                };
            case 403:
                return {
                    data,
                    success: false,
                    message: "Forbidden: The API key doesn't have permissions to perform the request.",
                };
            case 404:
                return {
                    data,
                    success: false,
                    message: "Not Found: The requested resource doesn't exist.",
                };
            case 405:
                return {
                    data,
                    success: false,
                    message: 'Method Not allowed: The selected HTTP method is not allowed',
                };
            case 422:
                return {
                    data,
                    success: false,
                    message: 'Unprocessable entity: indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions',
                };
            case 429:
                return {
                    data,
                    success: false,
                    message: 'Too Many Requests: Indicates the user has sent too many requests in a given amount of time',
                };
            default:
                return {
                    data,
                    success: false,
                    message: "Server Errors: Something went wrong on Termii's end OR status was not returned",
                };
        }
    }

    public async balance(){
        return axios.get(this.base(`get-balance?api_key=${this.key}`));
    }

    public async history() {
        return axios.get(this.base(`sms/inbox?api_key=${this.key}`));
    }

    public historyStatus() {
        // Will be added later
    }

    public async status({phone_number, country_code}: { phone_number: number, country_code: string }) {
        return axios.get(this.base(`insight/number/query?api_key=${this.key}&phone_number=${phone_number}&country_code=${country_code}`));
    }

    public async search({phone_number}:{phone_number: number}) {
        return axios.get(this.base(`check/dnd?api_key=${this.key}&phone_number=${phone_number}`));

    }

    public async allSenderId() {
        return axios.get(this.base(`sender-id?api_key=${this.key}`));
    }

    public senderIdStatus() {
        // Will be added later
    }

    public async submitSenderId({sender_id, use_case, company}:{sender_id: string, use_case: string, company: string}) {
        return axios.post(this.base('sender-id/request'), {
            api_key: this.key,
            sender_id: sender_id,
            usecase: use_case,
            company: company,
        });

    }

    public async sendMessage(props: {
        to: number
        from: string
        sms: string
        channel: string;
        media?: boolean
        media_url: string | null;
        media_caption: string | null
    }) {
        const type = 'plain';
        let {
            to, from, sms, channel = 'generic', media = false, media_url = null, media_caption = null
        } = props

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

            return await axios.post(this.base('sms/send'), data);
        }

        const data = {
            api_key: this.key,
            to: to,
            from: from,
            sms: sms,
            type: type,
            channel: channel,
        };

        return axios.post(this.base('sms/send'), data);

    }

    public async sendOTP(props: {to: number, from: string, message_type: string, pin_attempts: number, pin_time_to_live: number, pin_length: number, pin_placeholder: string, message_text: string, channel: string}) {
        const data = {
            ...props,
            channel: props.channel ||  'generic',
            api_key: this.key,
        };

        return axios.post(this.base('sms/otp/send'), data);

    }

    public async sendVoiceOTP(props: {
        to: number, pin_attempts: number, pin_time_to_live: number, pin_length: number,         phone_number?: number,

    }) {
        const data = {
            ...props,
            api_key: this.key,
        };

        return axios.post(this.base('sms/otp/send/voice'), data);

    }

    public async sendVoiceCall({to, code}:{to: number, code: number}) {
        const data = {
            api_key: this.key,
            phone_number: to,
            code: code,
        };

        return axios.post(this.base('sms/otp/call'), data);

    }

    public async verifyOTP({pinId, pin}:{pinId: string, pin: string}) {
        const data = {
            api_key: this.key,
            pin_id: pinId,
            pin: pin,
        };
        return axios.post(this.base('sms/otp/verify'), data);
    }

    public async sendInAppOTP(props: {
        to?: number,
        phone_number?: number,
        pin_attempts: number,
        pin_time_to_live: number,
        pin_length: number,
        pin_type: string
    }) {
        const data = {
            ...props,
            api_key: this.key,
        };

        return axios.post(this.base('sms/otp/generate'), data);

    }
}

export default TermiiJs
