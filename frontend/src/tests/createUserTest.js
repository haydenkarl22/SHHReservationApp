require('dotenv').config();
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL.replace('@', '%40')}`,
};

initializeApp({
  credential: cert(serviceAccount),
});

async function testCreateUser() {
  const email = `user_${Date.now()}@example.com`;
  const password = 'password1234';
  const displayName = 'TestUser';

  try {
    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName,
    });

    console.log('User created successfully:', userRecord.uid);
    process.exit(0);
  } catch (error) {
    console.error('Error during test:', error);
    process.exit(1);
  }
}

testCreateUser();