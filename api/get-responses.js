import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ 
            error: 'Method Not Allowed. Use GET.' 
        });
    }

    try {
        // Initialize Supabase client
        let config = {};
        try {
            // Try to load config file
            config = require('../supabase-config');
        } catch (error) {
            console.log('supabase-config.js not found, using environment variables only');
        }

        const supabaseUrl = process.env.SUPABASE_URL || config.supabaseUrl;
        const supabaseKey = process.env.SUPABASE_ANON_KEY || config.supabaseAnonKey;

        if (!supabaseUrl || !supabaseKey) {
            console.error('Missing Supabase configuration');
            return res.status(500).json({ 
                error: 'Server configuration error' 
            });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Fetch RSVP responses from Supabase
        const { data, error } = await supabase
            .from('rsvp_responses')
            .select('*')
            .order('submitted_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ 
                error: 'Failed to fetch responses' 
            });
        }

        // Convert data format to match frontend expectations
        const formattedData = data.map(response => ({
            id: response.id,
            firstName: response.first_name,
            lastName: response.last_name,
            guests: response.guests,
            guestNames: response.guest_names,
            message: response.note || '',
            submittedAt: response.submitted_at
        }));

        res.status(200).json(formattedData);

    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
} 