import * as CryptoJS from 'crypto-js';

export function encrypt(value: string) {
    return CryptoJS.AES.encrypt(value, '646d7e82-a22f-4109-90c4-c556b00d45ae').toString();
}

export function decrypt(value: string) {
    const bytes = CryptoJS.AES.decrypt(value, '646d7e82-a22f-4109-90c4-c556b00d45ae')
    return bytes.toString(CryptoJS.enc.Utf8);
}