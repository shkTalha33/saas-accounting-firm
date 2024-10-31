/* eslint-disable no-unused-vars */
import { jwtDecode } from 'jwt-decode';
import { encryptData } from './localStorageSecure';

const isTokenExpired = (token) => {
    if (!token) return true;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;

};
const isRefTokenExp = (token) => {
    if (!token) return true;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;

};

export { isTokenExpired, isRefTokenExp };
