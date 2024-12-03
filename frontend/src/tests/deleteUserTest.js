// deleteUserTest.js
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// Initialize Firebase Admin SDK
initializeApp();

async function testDeleteUser() {
  const email = `user@example.com`;

  try {
    // Fetch the user by email
    const user = await getAuth().getUserByEmail(email);

    // Delete the user
    await getAuth().deleteUser(user.uid);

    console.log('User deleted successfully:', user.uid);

    process.exit(0);
  } catch (error) {
    console.error('Error during test:', error);
    process.exit(1);
  }
}

testDeleteUser();
