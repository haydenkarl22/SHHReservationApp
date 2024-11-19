// src/pages/Booking.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Make sure to import auth
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'; // Install this package
import Header from '../components/Header';
import { 
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  CircularProgress
} from '@mui/material';

const AVAILABLE_TIMES = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "17:00", "17:30", "18:00", "18:30", "19:00",
  "19:30", "20:00", "20:30", "21:00"
];

function Booking() {
  const [user, loading] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [reservedTimes, setReservedTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    partySize: "",
    specialRequests: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch reserved times for selected date
  useEffect(() => {
    const fetchReservedTimes = async () => {
      if (!selectedDate) return;
      
      const dateStr = selectedDate.toISOString().split('T')[0];
      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where("date", "==", dateStr));
      
      try {
        const querySnapshot = await getDocs(q);
        const times = querySnapshot.docs.map(doc => doc.data().time);
        setReservedTimes(times);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("Failed to load reserved times. Please refresh the page.");
      }
    };

    fetchReservedTimes();
  }, [selectedDate]);

  // Pre-fill user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateBooking = () => {
    if (!selectedTime) {
      setError("Please select a time slot");
      return false;
    }
    if (!formData.name || !formData.email || !formData.phone || !formData.partySize) {
      setError("Please fill in all required fields");
      return false;
    }
    if (formData.partySize < 1 || formData.partySize > 10) {
      setError("Party size must be between 1 and 10");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError("Please sign in to make a booking");
      return;
    }

    if (!validateBooking()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      
      // Check if time slot is still available
      const bookingsRef = collection(db, 'bookings');
      const timeSlotQuery = query(
        bookingsRef, 
        where("date", "==", dateStr),
        where("time", "==", selectedTime)
      );
      const timeSlotCheck = await getDocs(timeSlotQuery);
      
      if (!timeSlotCheck.empty) {
        setError("Sorry, this time slot was just taken. Please select another time.");
        setIsLoading(false);
        return;
      }

      const bookingData = {
        ...formData,
        userId: user.uid,
        date: dateStr,
        time: selectedTime,
        partySize: parseInt(formData.partySize),
        createdAt: serverTimestamp(),
        status: 'confirmed'
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      setSubmitted(true);
      setReservedTimes(prev => [...prev, selectedTime]);
    } catch (err) {
      console.error("Error submitting booking:", err);
      setError("Failed to submit booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div className="page-wrapper">
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Make a Reservation
        </Typography>

        {submitted ? (
          <Alert severity="success" sx={{ mb: 4 }}>
            Thank you for your reservation! We'll send a confirmation email shortly.
          </Alert>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Select Date & Time
                </Typography>
                
                <TextField
                  type="date"
                  fullWidth
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  inputProps={{ min: new Date().toISOString().split('T')[0] }}
                  sx={{ mb: 3 }}
                />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Available Times:
                  </Typography>
                  <ToggleButtonGroup
                    value={selectedTime}
                    exclusive
                    onChange={(e, newTime) => setSelectedTime(newTime)}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
                      gap: 1
                    }}
                  >
                    {AVAILABLE_TIMES.map((time) => (
                      <ToggleButton
                        key={time}
                        value={time}
                        disabled={reservedTimes.includes(time)}
                        sx={{ p: 1 }}
                      >
                        {time}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Your Details
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Party Size"
                        name="partySize"
                        type="number"
                        inputProps={{ min: 1, max: 10 }}
                        value={formData.partySize}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Special Requests"
                        name="specialRequests"
                        multiline
                        rows={4}
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {error && (
                      <Grid item xs={12}>
                        <Alert severity="error">{error}</Alert>
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                      >
                        Submit Booking
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default Booking;