// export function decodeJWT(token: string): TokenPayload {
//     const base64Url = token.split('.')[1];
//     const data = base64Url.replace('-', '+').replace('_', '/');
//     return JSON.parse(Buffer.from(data, 'base64').toString());
// }
export function decodeJWT(token: string): TokenPayload {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}