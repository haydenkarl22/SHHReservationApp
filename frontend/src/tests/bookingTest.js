function bookingTest() {
    const selectedDate = "2024-12-03";
    const selectedTime = "12:30";
    const formData = {
      name: "First Last",
      email: "user@example.com",
      phone: "1234567890",
      partySize: 4,
      specialRequests: "Window seat.",
    };
  
    if (
      selectedDate &&
      selectedTime &&
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.partySize > 0 &&
      formData.partySize <= 10
    ) {
      console.log("Test passed: Booking data is valid.");
      process.exit(0);
    } else {
      console.error("Test failed: Missing or invalid booking data.");
      process.exit(1);
    }
  }
  
  bookingTest();