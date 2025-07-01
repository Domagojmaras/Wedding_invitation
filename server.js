const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Serve favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

// Endpoint to handle RSVP submissions
app.post('/submit-rsvp', (req, res) => {
    const formData = req.body;
    const timestamp = new Date().toISOString();
    const response = {
        ...formData,
        submittedAt: timestamp
    };

    // Read existing responses
    let responses = [];
    try {
        const data = fs.readFileSync('rsvp-responses.json', 'utf8');
        responses = JSON.parse(data);
    } catch (err) {
        // File doesn't exist yet, that's okay
    }

    // Add new response
    responses.push(response);

    // Save updated responses
    fs.writeFileSync('rsvp-responses.json', JSON.stringify(responses, null, 2));

    res.json({ success: true });
});

// Get all responses
app.get('/get-responses', (req, res) => {
    try {
        const data = fs.readFileSync('rsvp-responses.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.json([]);
    }
});

app.delete('/delete-response', (req, res) => {
    const { timestamp } = req.body;
    
    console.log('Delete request received for timestamp:', timestamp);
    
    if (!timestamp) {
        console.error('No timestamp provided');
        return res.status(400).json({ error: 'No timestamp provided' });
    }
    
    try {
        const data = fs.readFileSync('rsvp-responses.json', 'utf8');
        let responses = JSON.parse(data);
        
        console.log('Current responses count:', responses.length);
        
        // Filter out the response with the matching timestamp
        const originalCount = responses.length;
        responses = responses.filter(response => response.submittedAt !== timestamp);
        
        console.log('Responses after filtering:', responses.length);
        
        if (responses.length === originalCount) {
            console.log('No matching response found for timestamp:', timestamp);
            return res.status(404).json({ error: 'Response not found' });
        }
        
        // Save updated responses
        fs.writeFileSync('rsvp-responses.json', JSON.stringify(responses, null, 2));
        
        console.log('Response deleted successfully');
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting response:', err);
        res.status(500).json({ error: 'Failed to delete response' });
    }
});

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 