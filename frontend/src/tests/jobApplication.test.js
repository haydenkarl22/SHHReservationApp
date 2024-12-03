describe('Job Application Validation', () => {
  test('validates job application data', () => {
    const jobApplicationData = {
      fullName: "First Last",
      email: "applicant@example.com",
      phone: "1234567890",
      resume: "resume.pdf",
      coverLetter: "cover_letter.txt",
      position: "Waiter",
    };

    expect(jobApplicationData.fullName).toBeTruthy();
    expect(jobApplicationData.email).toBeTruthy();
    expect(jobApplicationData.phone).toBeTruthy();
    expect(jobApplicationData.resume).toBeTruthy();
    expect(jobApplicationData.position).toBeTruthy();
  });
});