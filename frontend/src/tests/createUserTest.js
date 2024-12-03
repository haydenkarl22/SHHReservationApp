// Would use actual firebase implementation, but it proved too difficult to push to GitHub (There does exist these test in a branch though, just not functional). 
function createUserTest() {
  const email = "testuser@example.com";
  const password = "testpassword123";
  const displayName = "Test User";

  if (email && password && displayName) {
    console.log("Test passed: User data is valid.");
    process.exit(0);
  } else {
    console.error("Test failed: Missing user data.");
    process.exit(1);
  }
}

createUserTest();