import CryptoJS from 'crypto-js';
const secret_key = 'privateKey_encription_32';

export const encryptData = (key, data) => {
    try {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secret_key).toString();
        window.localStorage.setItem(key, encryptedData);
    } catch (error) {
        console.error('Error encrypting data:', error);
    }
};

export const decryptData = (key) => {
    try {
        const encryptedData = window.localStorage.getItem(key);
        if (encryptedData) {
            const bytes = CryptoJS.AES.decrypt(encryptedData, secret_key);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        }
    } catch (error) {
        console.error('Error decrypting data:', error);
    }
    return null;
};