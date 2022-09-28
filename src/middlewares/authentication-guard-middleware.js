"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationGuardMiddleware = void 0;
const authenticationGuardMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const validAuthHeader = 'Basic YWRtaW46cXdlcnR5';
    if (authHeader !== validAuthHeader) {
        res.sendStatus(401);
        return;
    }
    next();
};
exports.authenticationGuardMiddleware = authenticationGuardMiddleware;
//const loginPass = 'admin:qwerty'
//const base64 = encoder(loginPass)
//const validAuthHeader = `Basic ${base64}`
// const base64 = new Buffer(loginPass, 'base64')
// -------------------------------------------------------------------------------------
// function encoder(str: string) {
//     return window.btoa(str);
// }
//
// function decoder(str: string) {
//     return window.atob('str')
// }
