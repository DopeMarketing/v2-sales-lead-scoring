import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SHEETS_API_KEY || '{}'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

export interface SheetData {
  spreadsheetId: string;
  range: string;
  values: any[][];
}

export interface ReadRequest {
  spreadsheetId: string;
  range: string;
}

export async function appendToSheet(data: SheetData) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: data.spreadsheetId,
      range: data.range,
      valueInputOption: 'RAW',
      requestBody: {
        values: data.values
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to append to sheet: ${error}`);
  }
}

export async function readFromSheet(request: ReadRequest) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: request.spreadsheetId,
      range: request.range
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to read from sheet: ${error}`);
  }
}