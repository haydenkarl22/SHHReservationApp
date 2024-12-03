// src/pages/Booking.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
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
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const AVAILABLE_TIMES = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "17:00", "17:30", "18:00", "18:30", "19:00",
  "19:30", "20:00", "20:30", "21:00"
];

const Calendar = ({ reservedTimes, onDateSelect, selectedDate, availableTimes }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);
  const [selectedDayTimes, setSelectedDayTimes] = useState([]);
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDayClick = (day) => {
    const selectedDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect(selectedDay);
    
    const dateStr = selectedDay.toISOString().split('T')[0];
    const dayTimes = availableTimes.map(time => ({
      time,
      isBooked: reservedTimes[dateStr]?.some(booking => booking.time === time),
      bookedBy: reservedTimes[dateStr]?.find(booking => booking.time === time)?.lastName || ''
    }));
    
    setSelectedDayTimes(dayTimes);
    setTimeDialogOpen(true);
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ p: 2 }} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      const hasBookings = reservedTimes[dateStr]?.length > 0;

      days.push(
        <Box
          key={day}
          onClick={() => handleDayClick(day)}
          sx={{
            p: 2,
            border: '1px solid #ddd',
            cursor: 'pointer',
            backgroundColor: hasBookings ? '#fff3e0' : 'white',
            '&:hover': {
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          <Typography>{day}</Typography>
          {hasBookings && (
            <Typography variant="caption" color="text.secondary">
              Has bookings
            </Typography>
          )}
        </Box>
      );
    }

    return days;
  };

  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handlePreviousMonth}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ChevronRight />
        </IconButton>
      </Box>

      <Grid container columns={7} spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Grid item xs={1} key={day}>
            <Typography align="center" fontWeight="bold">
              {day}
            </Typography>
          </Grid>
        ))}
        {renderCalendarDays().map((day, index) => (
          <Grid item xs={1} key={index}>
            {day}
          </Grid>
        ))}
      </Grid>

      <Dialog open={timeDialogOpen} onClose={() => setTimeDialogOpen(false)}>
        <DialogTitle>Available Times</DialogTitle>
        <DialogContent>
          <List>
            {selectedDayTimes.map(({ time, isBooked, bookedBy }) => (
              <ListItem key={time}>
                <ListItemText
                  primary={time}
                  secondary={isBooked ? `Booked - ${bookedBy}` : 'Available'}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

function Booking() {
  const [user, loading] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [reservedTimes, setReservedTimes] = useState({});
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


  useEffect(() => {
    const fetchReservedTimes = async () => {
      if (!selectedDate) return;
      
      const dateStr = selectedDate.toISOString().split('T')[0];
      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where("date", "==", dateStr));
      
      try {
        const querySnapshot = await getDocs(q);
        const bookings = querySnapshot.docs.map(doc => ({
          time: doc.data().time,
          lastName: doc.data().name.split(' ').pop()
        }));
        setReservedTimes(prev => ({
          ...prev,
          [dateStr]: bookings
        }));
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("Failed to load reserved times. Please refresh the page.");
      }
    };

    fetchReservedTimes();
  }, [selectedDate]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const isDateInPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateBooking = () => {
    if (isDateInPast(selectedDate)) {
      setError("Cannot make reservations for past dates");
      return false;
    }
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

  const handleDateSelect = (date) => {
    if (isDateInPast(date)) {
      setError("Cannot select past dates");
      return;
    }
    setSelectedDate(date);
    setError(""); 
  };

  const fetchReservedTimesForDate = async (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const bookingsRef = collection(db, 'bookings');
    const q = query(bookingsRef, where("date", "==", dateStr));
    
    try {
      const querySnapshot = await getDocs(q);
      const bookings = querySnapshot.docs.map(doc => ({
        time: doc.data().time,
        lastName: doc.data().name.split(' ').pop()
      }));
      
      setReservedTimes(prev => ({
        ...prev,
        [dateStr]: bookings
      }));
      
      return bookings; 
    } catch (err) {
      console.error("Error fetching reservations:", err);
      return [];
    }
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
      
      // Update reserved times
      const lastName = formData.name.split(' ').pop();
      setReservedTimes(prev => ({
        ...prev,
        [dateStr]: [...(prev[dateStr] || []), { time: selectedTime, lastName }]
      }));
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Make a Reservation
        </Typography>

        {!submitted && (
          <>
            <Calendar
              reservedTimes={reservedTimes}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
              availableTimes={AVAILABLE_TIMES}
              fetchReservedTimes={fetchReservedTimesForDate}
            />
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Select Time
                  </Typography>
                  
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
                          disabled={reservedTimes[selectedDate.toISOString().split('T')[0]]?.some(booking => booking.time === time)}
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
                          disabled={isLoading}
                        >
                          {isLoading ? <CircularProgress size={24} /> : 'Submit Booking'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}

        {submitted && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Thank you for your reservation! We'll send a confirmation email shortly.
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default Booking;