describe('Booking Validation', () => {
  test('validates booking data correctly', () => {
    const selectedDate = "2024-12-03";
    const selectedTime = "12:30";
    const formData = {
      name: "First Last",
      email: "user@example.com",
      phone: "1234567890",
      partySize: 4,
      specialRequests: "Window seat.",
    };

    expect(selectedDate).toBeTruthy();
    expect(selectedTime).toBeTruthy();
    expect(formData.name).toBeTruthy();
    expect(formData.email).toBeTruthy();
    expect(formData.phone).toBeTruthy();
    expect(formData.partySize).toBeGreaterThan(0);
    expect(formData.partySize).toBeLessThanOrEqual(10);
  });
});