// // utils/tokenUtils.js

// export function decodeToken(token) {
//     try {
//         const payload = token.split('.')[1];
//         const decoded = JSON.parse(atob(payload));
//         return decoded;
//     } catch (e) {
//         console.error('Invalid token:', e);
//         return null;
//     }
// }

// export function isTokenExpired(token) {
//     const decoded = decodeToken(token);
//     if (!decoded || !decoded.exp) {
//         return true;
//     }
//     const now = Math.floor(Date.now() / 1000);
//     return decoded.exp < now;
// }
