function jobApplicationTest() {
    const jobApplicationData = {
      fullName: "First Last",
      email: "applicant@example.com",
      phone: "1234567890",
      resume: "resume.pdf",
      coverLetter: "cover_letter.txt",
      position: "Waiter",
    };
  
    if (
      jobApplicationData.fullName &&
      jobApplicationData.email &&
      jobApplicationData.phone &&
      jobApplicationData.resume &&
      jobApplicationData.position
    ) {
      console.log("Test passed: Job application data is valid.");
      process.exit(0);
    } else {
      console.error("Test failed: Missing or invalid job application data.");
      process.exit(1);
    }
  }
  
  jobApplicationTest();