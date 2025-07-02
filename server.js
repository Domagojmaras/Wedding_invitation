const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// Supabase configuration
const config = require('./supabase-config');
const supabaseUrl = process.env.SUPABASE_URL || config.supabaseUrl;
const supabaseKey = process.env.SUPABASE_ANON_KEY || config.supabaseAnonKey;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Serve favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

// Endpoint to handle RSVP submissions
// app.post('/submit-rsvp', async (req, res) => {
//     try {
//         const formData = req.body;
        
//         // Prepare data for Supabase (convert field names to match schema)
//         const supabaseData = {
//             first_name: formData.firstName,
//             last_name: formData.lastName,
//             guests: parseInt(formData.guests) || 0,
//             guest_names: formData.guestNames,
//             note: formData.message || ''
//         };

//         // Insert into Supabase
//         const { data, error } = await supabase
//             .from('rsvp_responses')
//             .insert([supabaseData])
//             .select();

//         if (error) {
//             console.error('Supabase error:', error);
//             return res.status(500).json({ 
//                 success: false, 
//                 error: 'Failed to save RSVP response' 
//             });
//         }

//         console.log('RSVP saved successfully:', data);
//         res.json({ success: true, data: data[0] });

//     } catch (err) {
//         console.error('Server error:', err);
//         res.status(500).json({ 
//             success: false, 
//             error: 'Internal server error' 
//         });
//     }
// });

// Get all responses
// app.get('/get-responses', async (req, res) => {
//     try {
//         const { data, error } = await supabase
//             .from('rsvp_responses')
//             .select('*')
//             .order('submitted_at', { ascending: false });

//         if (error) {
//             console.error('Supabase error:', error);
//             return res.status(500).json({ 
//                 error: 'Failed to fetch responses' 
//             });
//         }

//         // Convert data format to match frontend expectations
//         const formattedData = data.map(response => ({
//             id: response.id,
//             firstName: response.first_name,
//             lastName: response.last_name,
//             guests: response.guests,
//             guestNames: response.guest_names,
//             message: response.note || '',
//             submittedAt: response.submitted_at
//         }));

//         res.json(formattedData);

//     } catch (err) {
//         console.error('Server error:', err);
//         res.status(500).json({ 
//             error: 'Internal server error' 
//         });
//     }
// });

// Delete response endpoint
// app.delete('/delete-response', async (req, res) => {
//     try {
//         const { timestamp, id } = req.body;
        
//         console.log('Delete request received for:', { timestamp, id });
        
//         if (!timestamp && !id) {
//             console.error('No timestamp or id provided');
//             return res.status(400).json({ error: 'No timestamp or id provided' });
//         }

//         let query = supabase.from('rsvp_responses').delete();
        
//         // Delete by ID if provided, otherwise by timestamp
//         if (id) {
//             query = query.eq('id', id);
//         } else {
//             query = query.eq('submitted_at', timestamp);
//         }

//         const { data, error } = await query.select();

//         if (error) {
//             console.error('Supabase delete error:', error);
//             return res.status(500).json({ 
//                 error: 'Failed to delete response' 
//             });
//         }

//         if (!data || data.length === 0) {
//             console.log('No matching response found');
//             return res.status(404).json({ error: 'Response not found' });
//         }

//         console.log('Response deleted successfully:', data);
//         res.json({ success: true, deleted: data[0] });

//     } catch (err) {
//         console.error('Server error:', err);
//         res.status(500).json({ 
//             error: 'Internal server error' 
//         });
//     }
// });



// Test endpoint to verify Supabase connection
app.get('/test-supabase', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('rsvp_responses')
            .select('count')
            .limit(1);

        if (error) {
            return res.status(500).json({ 
                connected: false, 
                error: error.message 
            });
        }

        res.json({ 
            connected: true, 
            message: 'Supabase connection successful',
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        res.status(500).json({ 
            connected: false, 
            error: err.message 
        });
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
    console.log(`Supabase URL: ${supabaseUrl}`);
    console.log('To test Supabase connection, visit: http://localhost:' + port + '/test-supabase');
}); 