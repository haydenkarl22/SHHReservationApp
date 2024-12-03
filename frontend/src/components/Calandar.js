import React, { useState } from 'react';
import { 
  Paper,
  IconButton,
  Typography,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Calendar = ({ reservedTimes, onDateSelect, selectedDate, availableTimes, fetchReservedTimes }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);
  const [selectedDayTimes, setSelectedDayTimes] = useState([]);

  const isDateInPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }; 
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    const today = new Date();
    if (newDate.getMonth() >= today.getMonth() || newDate.getFullYear() > today.getFullYear()) {
      setCurrentMonth(newDate);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDayClick = async (day) => {
    const selectedDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (isDateInPast(selectedDay)) {
      return;
    }
    
    onDateSelect(selectedDay);
    
    const dateStr = selectedDay.toISOString().split('T')[0];
    const bookings = await fetchReservedTimes(selectedDay);
    
    const dayTimes = availableTimes.map(time => ({
      time,
      isBooked: bookings.some(booking => booking.time === time),
      bookedBy: bookings.find(booking => booking.time === time)?.lastName || ''
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
      const isPast = isDateInPast(date);

      days.push(
        <Box
          key={day}
          onClick={() => !isPast && handleDayClick(day)}
          sx={{
            p: 2,
            border: '1px solid #ddd',
            cursor: isPast ? 'not-allowed' : 'pointer',
            backgroundColor: isPast ? '#f5f5f5' : hasBookings ? '#fff3e0' : 'white',
            color: isPast ? '#999' : 'inherit',
            '&:hover': {
              backgroundColor: isPast ? '#f5f5f5' : '#f0f0f0'
            }
          }}
        >
          <Typography>{day}</Typography>
          {hasBookings && !isPast && (
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

export default Calendar;