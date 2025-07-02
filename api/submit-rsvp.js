import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method Not Allowed. Use POST.' 
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
                success: false,
                error: 'Server configuration error' 
            });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const formData = req.body;
        
        // Prepare data for Supabase (convert field names to match schema)
        const supabaseData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            guests: parseInt(formData.guests) || 0,
            guest_names: formData.guestNames,
            note: formData.message || ''
        };

        // Insert into Supabase
        const { data, error } = await supabase
            .from('rsvp_responses')
            .insert([supabaseData])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ 
                success: false, 
                error: 'Failed to save RSVP response' 
            });
        }

        console.log('RSVP saved successfully:', data);
        res.status(200).json({ success: true, data: data[0] });

    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ 
            success: false, 
            error: 'Internal server error' 
        });
    }
} 