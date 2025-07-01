# Wedding Invitation Website

A beautiful, responsive wedding invitation website with RSVP functionality built with HTML, CSS, JavaScript, and Node.js.

## Features

- **Elegant Design**: Clean, minimalistic black and white design with elegant typography
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **RSVP System**: Complete RSVP functionality with guest management
- **Admin Panel**: Secure admin interface to view RSVP responses
- **Event Details**: Multiple event sections with venue information and maps
- **Custom Fonts**: Beautiful typography using Google Fonts (Seasons, Playfair Display, Montserrat)

## Event Structure

The website displays three main events:
1. **OKUPLJANJE** (13:00) - Gathering at Vijugava 14 and Restoran Pelegrin
2. **VJENČANJE** (17:00) - Wedding ceremony at Crkva sv. Barbare
3. **PROSLAVA** (20:00) - Celebration at Golf Vjenčanja Zaprešić

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON file (rsvp-responses.json)
- **Authentication**: Simple password-based admin access
- **Deployment**: Ready for Vercel, Heroku, or any Node.js hosting

## Installation

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd wedding-invitation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Access the website**
   - Main invitation: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`
   - Login: `http://localhost:3000/login`

## Configuration

### Admin Password
Change the admin password in `server.js`:
```javascript
const ADMIN_PASSWORD = 'YourNewPassword';
```

### Event Details
Update event information in `index.html`:
- Event times and venues
- Map links
- Contact information

### Styling
Customize the design in `/styles.css`:
- Colors and fonts
- Layout and spacing
- Responsive breakpoints

## File Structure

```
wedding-invitation/
├── index.html          # Main invitation page
├── admin.html          # Admin panel for RSVP responses
├── login.html          # Admin login page
├── styles.css          # Main stylesheet
├── app.js              # Frontend JavaScript
├── server.js           # Backend server
├── package.json        # Node.js dependencies
├── rsvp-responses.json # RSVP data storage
├── images/             # Image assets
│   ├── wedding-bells.png
│   ├── newlyweds.png
│   ├── cocktail.png
│   └── White Floral Watercolor Wedding Invitation.jpeg
└── README.md           # This file
```

## API Endpoints

- `POST /submit-rsvp` - Submit RSVP response
- `GET /get-responses` - Get all RSVP responses (admin only)
- `DELETE /delete-response` - Delete specific response (admin only)
- `POST /login` - Admin authentication

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Node.js project
3. Deploy with default settings

### Heroku
1. Create a new Heroku app
2. Connect your GitHub repository
3. Deploy the main branch

### Other Platforms
The application is compatible with any Node.js hosting platform.

## Customization

### Changing Event Details
Edit the event sections in `index.html`:
```html
<div class="cocktail">
    <h3 class="time">13:00</h3>
    <p class="event-type-seasons">OKUPLJANJE</p>
    <p class="venue">Your venue details</p>
</div>
```

### Updating Styling
Modify `styles.css` to change:
- Colors and fonts
- Layout and spacing
- Responsive behavior

### Adding New Features
The modular structure makes it easy to add:
- Additional event sections
- New form fields
- Custom styling
- Additional functionality

## Security

- Admin panel is password-protected
- RSVP data is stored locally
- No sensitive information is exposed

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues, please open an issue on GitHub or contact the developer.

---

**Created with ❤️ for your special day** 