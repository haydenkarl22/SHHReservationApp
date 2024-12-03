const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const path = require('path');

const serviceAccountPath = path.resolve(__dirname, '../../sshreservationapp-3300.json');

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(require(serviceAccountPath)),
  projectId: 'sshreservationapp-3300',
});

async function testCreateUser() {
  const email = `user@example.com`;
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