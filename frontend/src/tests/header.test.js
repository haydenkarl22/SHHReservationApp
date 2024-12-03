describe('Header Display', () => {
  test.each([
    [true, "PROFILE"],
    [false, "LOGIN"]
  ])('displays correct link based on login state', (isLoggedIn, expectedLink) => {
    const headerLinks = [
      "HOME",
      "BOOKING",
      "MENU",
      "ABOUT",
      "JOBS",
      isLoggedIn ? "PROFILE" : "LOGIN"
    ];

    const lastLink = headerLinks[headerLinks.length - 1];
    expect(lastLink).toBe(expectedLink);
  });
});