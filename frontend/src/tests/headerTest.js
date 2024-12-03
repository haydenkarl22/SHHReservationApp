function headerTest() {

    const isLoggedInStates = [true, false];
  
    isLoggedInStates.forEach((isLoggedIn) => {
      const displayedLink = isLoggedIn ? "PROFILE" : "LOGIN";
  
      const headerLinks = [
        "HOME",
        "BOOKING",
        "MENU",
        "ABOUT",
        "JOBS",
        displayedLink,
      ];
  
      const lastLink = headerLinks[headerLinks.length - 1];
      if (lastLink === displayedLink) {
        console.log(`Test passed: Header displays "${displayedLink}" for isLoggedIn=${isLoggedIn}.`);
      } else {
        console.error(`Test failed: Header displays "${lastLink}" instead of "${displayedLink}" for isLoggedIn=${isLoggedIn}.`);
        process.exit(1);
      }
    });
  
    process.exit(0);
  }
  
  headerTest();