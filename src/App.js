import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography, Button, TextField, FormControl, FormControlLabel, Radio, RadioGroup, Paper, Divider } from '@mui/material';
import styled from 'styled-components';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#666666',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '2.5rem',
      fontWeight: 400,
      letterSpacing: '0.1em',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '1.8rem',
      fontWeight: 400,
      letterSpacing: '0.1em',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '1.5rem',
      fontWeight: 400,
      letterSpacing: '0.1em',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.05em',
      lineHeight: 1.8,
    },
  },
});

const StyledPaper = styled(Paper)`
  padding: 3rem;
  margin: 2rem 0;
  background-color: #ffffff;
  box-shadow: none;
  border: 1px solid #e0e0e0;
`;

const StyledDivider = styled(Divider)`
  margin: 2rem 0;
  width: 50px;
  border-color: #000000;
`;

const StyledButton = styled(Button)`
  border-radius: 0;
  padding: 12px 40px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.9rem;
  margin-top: 2rem;
`;

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guests: '',
    guestNames: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your response!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h1" gutterBottom sx={{ mb: 4 }}>
            John & Jane
          </Typography>
          
          <Typography variant="h2" gutterBottom sx={{ mb: 6 }}>
            Are Getting Married
          </Typography>

          <StyledDivider />

          <Typography variant="h3" sx={{ mb: 4 }}>
            June 15, 2024
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 6 }}>
            We joyfully invite you to celebrate our wedding
          </Typography>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" gutterBottom>
              4:00 PM
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Ceremony
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Venue Name<br />
              123 Wedding Street<br />
              City, State 12345
            </Typography>

            <Typography variant="h3" gutterBottom sx={{ mt: 6 }}>
              6:00 PM
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Reception
            </Typography>
            <Typography variant="body1">
              Reception Venue<br />
              456 Celebration Ave<br />
              City, State 12345
            </Typography>
          </Box>

          <StyledPaper elevation={0}>
            <Typography variant="h2" gutterBottom sx={{ fontSize: '1.8rem', mb: 4 }}>
              RSVP
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <FormControl component="fieldset" margin="normal" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Will you attend?
                </Typography>
                <RadioGroup
                  name="attending"
                  value={formData.attending}
                  onChange={handleChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes, I will attend" />
                  <FormControlLabel value="no" control={<Radio />} label="No, I cannot attend" />
                </RadioGroup>
              </FormControl>
              <TextField
                fullWidth
                label="Number of Guests"
                name="guests"
                type="number"
                value={formData.guests}
                onChange={handleChange}
                margin="normal"
                disabled={formData.attending === 'no'}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Names of Guests"
                name="guestNames"
                multiline
                rows={2}
                value={formData.guestNames}
                onChange={handleChange}
                margin="normal"
                disabled={formData.attending === 'no'}
                variant="outlined"
                sx={{ mb: 2 }}
                placeholder="Please list the names of your guests"
              />
              <TextField
                fullWidth
                label="Message (Optional)"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Send RSVP
              </StyledButton>
            </form>
          </StyledPaper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App; 