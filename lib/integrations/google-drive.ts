import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_DRIVE_API_KEY || '{}'),
  scopes: ['https://www.googleapis.com/auth/drive']
});

const drive = google.drive({ version: 'v3', auth });

export interface FileMetadata {
  name: string;
  parents?: string[];
  mimeType?: string;
}

export interface FileQuery {
  q?: string;
  pageSize?: number;
}

export async function uploadFile(fileMetadata: FileMetadata, media: any) {
  try {
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error}`);
  }
}

export async function listFiles(query: FileQuery = {}) {
  try {
    const response = await drive.files.list({
      q: query.q,
      pageSize: query.pageSize || 10,
      fields: 'nextPageToken, files(id, name)'
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to list files: ${error}`);
  }
}