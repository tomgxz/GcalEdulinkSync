"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
function uploadICS(ICS, keys) {
    const oAuth2Client = new google_auth_library_1.OAuth2Client({
        clientId: keys.ClientID,
        clientSecret: keys.ClientSecret,
        redirectUri: keys.redirectUri,
    });
    const calendarId = "https://calendar.google.com/calendar/u/0?cid=Y3liZXJza2VseUBnbWFpbC5jb20";
    oAuth2Client.setCredentials({
        access_token: 'YOUR_ACCESS_TOKEN',
        refresh_token: 'YOUR_REFRESH_TOKEN',
        scope: 'https://www.googleapis.com/auth/calendar',
        token_type: 'Bearer',
        expiry_date: 3600,
    });
}
//# sourceMappingURL=GcalHandler.js.map