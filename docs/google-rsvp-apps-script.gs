const SHEET_NAME = 'RSVP';
const NOTIFY_EMAILS = ['you@example.com', 'client@example.com'];

function doGet() {
  return jsonResponse_({ ok: true, message: 'RSVP endpoint is running.' });
}

function doPost(e) {
  const data = e && e.parameter ? e.parameter : {};
  const sheet = getSheet_();

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.guests || '',
    data.dietary || '',
    data.friday || '',
    data.otherDish || '',
    data.message || '',
  ]);

  if (NOTIFY_EMAILS.length) {
    const name = data.name || 'Guest';
    const subject = `New RSVP: ${name}`;
    const body = [
      `Name: ${data.name || ''}`,
      `Email: ${data.email || ''}`,
      `Phone: ${data.phone || ''}`,
      `Guests: ${data.guests || ''}`,
      `Dietary: ${data.dietary || ''}`,
      `Friday Plans: ${data.friday || ''}`,
      `Other Dish Contribution: ${data.otherDish || ''}`,
      `Message: ${data.message || ''}`,
    ].join('\n');

    MailApp.sendEmail(NOTIFY_EMAILS.join(','), subject, body);
  }

  return jsonResponse_({ ok: true });
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Guests',
      'Dietary',
      'Friday Plans',
      'Other Dish Contribution',
      'Message',
    ]);
  }

  return sheet;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
