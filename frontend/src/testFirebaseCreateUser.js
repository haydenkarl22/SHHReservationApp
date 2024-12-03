// createUserTest.js
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// Initialize Firebase Admin SDK
initializeApp();

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