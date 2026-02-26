# Google RSVP Setup

This project now supports sending RSVP submissions from the existing styled form to Google Sheets through Google Apps Script.

## 1. Create the Google Sheet

1. In the client's Google account, create a new Google Sheet.
2. Name it (example: `Family RSVP Responses`).
3. Open `Extensions -> Apps Script`.

## 2. Add the Apps Script handler

1. Replace the default script with the contents of:
   - `docs/google-rsvp-apps-script.gs`
2. Update `NOTIFY_EMAILS` at the top of the script.
3. Click `Save`.

## 3. Deploy as web app

1. Click `Deploy -> New deployment`.
2. Type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Click `Deploy`, then copy the `Web app URL` (ends with `/exec`).
6. In project root, create `.env` and set:

```env
PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/PASTE_DEPLOYMENT_ID/exec
```

## 4. Run and test

1. Start local server:

```sh
npm run dev
```

2. Submit the RSVP form on the site.
3. Confirm:
   - New row appears in the Sheet.
   - Notification email arrives.

## Notes

- When `PUBLIC_GOOGLE_SCRIPT_URL` is set, the RSVP component automatically uses Google Apps Script instead of Netlify Forms.
- Submissions redirect to `/thank-you` after send.
