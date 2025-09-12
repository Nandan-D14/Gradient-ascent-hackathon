import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Path to your credentials JSON file (place it in the root of your project or a secure location)
const CREDENTIALS_PATH = path.join(process.cwd(), 'google-credentials.json');

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  upload.single('file')(req as any, res as any, async (err: any) => {
    if (err) return res.status(500).json({ error: err.message });

    // Read credentials JSON
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;

    // Get the access token from the request (if using OAuth flow)
    const { token } = req.body;
    const file = (req as any).file;

    // Set up OAuth2 client
    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oauth2Client.setCredentials({ access_token: token });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    try {
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimetype,
          // parents: ['YOUR_FOLDER_ID'], // Optional: upload to specific folder
        },
        media: {
          mimeType: file.mimetype,
          body: Buffer.from(file.buffer),
        },
      });
      res.status(200).json({ fileId: response.data.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}
