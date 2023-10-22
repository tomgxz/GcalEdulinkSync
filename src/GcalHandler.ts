import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';

function uploadICS(ICS, keys) {
    const oAuth2Client = new OAuth2Client({
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