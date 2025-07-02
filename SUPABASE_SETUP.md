# Supabase Setup Guide for Wedding Invitation

## Overview
Your wedding invitation has been successfully refactored to use Supabase instead of local JSON file storage. This provides better scalability, security, and real-time capabilities.

## Setup Steps

### 1. Create Database Schema
First, apply the database schema to your Supabase project:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor** (in the left sidebar)
4. Copy and paste the following schema:

```sql
CREATE TABLE IF NOT EXISTS public.rsvp_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    guests INTEGER,
    guest_names TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rsvp_submitted_at ON public.rsvp_responses(submitted_at);
CREATE INDEX IF NOT EXISTS idx_rsvp_names ON public.rsvp_responses(first_name, last_name);

-- Enable Row Level Security (RLS)
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert RSVP responses
CREATE POLICY "Anyone can submit RSVP" ON public.rsvp_responses
    FOR INSERT WITH CHECK (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.rsvp_responses TO anon;
GRANT ALL ON public.rsvp_responses TO authenticated;
```

5. Click **Run** to execute the schema

### 2. Configure API Keys

1. In your Supabase Dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **URL**: Your project URL
   - **anon public**: Your anonymous/public key

3. Open the file `supabase-config.js` in your project
4. Replace the placeholder values:
   ```javascript
   module.exports = {
       supabaseUrl: 'https://your-project-ref.supabase.co',
       supabaseAnonKey: 'your_actual_anon_key_here'
   };
   ```

### 3. Test the Connection

1. Start your server:
   ```bash
   npm start
   ```

2. Open your browser and go to:
   ```
   http://localhost:3000/test-supabase
   ```

3. You should see a success message if everything is configured correctly.

### 4. Test the Application

1. Visit your wedding invitation: `http://localhost:3000`
2. Fill out and submit the RSVP form
3. Check the admin panel: `http://localhost:3000/admin`
4. Verify that responses are being saved and displayed

## New Features

### Admin Dashboard Improvements
- **Statistics**: View total responses, attendees, and guest counts
- **Better UI**: Improved design with loading states and error messages
- **Delete Functionality**: Remove invalid or test responses
- **Supabase Test**: Built-in connection testing

### API Endpoints
- `POST /submit-rsvp` - Submit RSVP responses
- `GET /get-responses` - Retrieve all responses
- `GET /get-stats` - Get response statistics
- `DELETE /delete-response` - Remove a response
- `GET /test-supabase` - Test database connection

## Security Notes

1. **Row Level Security (RLS)** is enabled on the table
2. Only `INSERT` permissions are granted to anonymous users
3. The `anon` key is safe to use in frontend applications
4. Consider adding admin authentication for the admin panel

## Troubleshooting

### Connection Issues
- Verify your API keys are correct
- Check that your Supabase project is active
- Ensure the database schema was applied correctly

### Permission Errors
- Make sure RLS policies are set up correctly
- Verify that the `anon` role has INSERT permissions

### Data Not Appearing
- Check the browser console for JavaScript errors
- Test the `/test-supabase` endpoint
- Verify the table schema matches the expected format

## Migration from JSON Storage

Your old `rsvp-responses.json` file is no longer used. If you have existing responses you want to migrate:

1. Read the JSON file data
2. Insert each response into Supabase using the admin panel or API
3. Verify all data has been transferred correctly
4. Keep the JSON file as a backup until you're confident everything works

## Next Steps

Consider adding:
- Authentication for the admin panel
- Email notifications for new RSVPs
- Real-time updates using Supabase subscriptions
- Data validation and sanitization
- Backup and export functionality 