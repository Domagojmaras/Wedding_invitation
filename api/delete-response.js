import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Only allow DELETE requests
    if (req.method !== 'DELETE') {
        return res.status(405).json({ 
            error: 'Method Not Allowed. Use DELETE.' 
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

        const { timestamp, id } = req.body;
        
        console.log('Delete request received for:', { timestamp, id });
        
        if (!timestamp && !id) {
            console.error('No timestamp or id provided');
            return res.status(400).json({ error: 'No timestamp or id provided' });
        }

        let query = supabase.from('rsvp_responses').delete();
        
        // Delete by ID if provided, otherwise by timestamp
        if (id) {
            query = query.eq('id', id);
        } else {
            query = query.eq('submitted_at', timestamp);
        }

        const { data, error } = await query.select();

        if (error) {
            console.error('Supabase delete error:', error);
            return res.status(500).json({ 
                error: 'Failed to delete response' 
            });
        }

        if (!data || data.length === 0) {
            console.log('No matching response found');
            return res.status(404).json({ error: 'Response not found' });
        }

        console.log('Response deleted successfully:', data);
        res.status(200).json({ success: true, deleted: data[0] });

    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
} 