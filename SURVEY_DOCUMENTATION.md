# BPP Volunteer Survey Application

## Overview

This is a Next.js web application designed for recruiting volunteers and collecting survey data about the BPP (community) area. The application provides a complete workflow from volunteer registration through data collection.

## Features

### 1. Volunteer Registration
- **Self-registration system** allowing volunteers to sign up independently
- **Required information:**
  - Full name
  - Email address
  - Phone number
  - Physical address
- **Optional information:**
  - Availability preferences (weekdays, weekends, both, flexible)
  - Previous survey experience
- **Form validation** ensures all required fields are properly filled
- **Data persistence** using browser localStorage

### 2. Survey Data Collection
The survey form collects comprehensive data about the surveyed area, organized into the following categories:

#### Basic Information
- Location/area description
- Date of observation
- Time of day (morning, afternoon, evening, night)

#### Environmental Conditions
- Weather conditions
- Noise level
- Air quality perception
- Availability of green spaces/parks

#### Traffic & Transportation
- Traffic level
- Parking availability
- Pedestrian activity
- Cyclist activity
- Public transport usage

#### Area Activity
- Commercial activity level
- Residential activity level

#### Infrastructure & Safety
- Infrastructure condition
- Safety perception
- Accessibility for wheelchairs, strollers, etc.

#### Additional Observations
- Free-text field for any other observations or notes

### 3. User Experience
- **Clean, modern interface** with responsive design
- **Navigation flow:**
  1. Home page with welcome message and action buttons
  2. Registration page (for new volunteers)
  3. Survey page (can be accessed directly or after registration)
  4. Thank you page after survey submission
- **Form validation** with clear error messages
- **Personalized experience** - displays volunteer name after registration
- **Data privacy notice** on all relevant pages

## Technology Stack

- **Framework:** Next.js 16.0.3
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Build Tool:** Turbopack

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Data Storage

Currently, the application uses **browser localStorage** for data persistence:

- **Volunteers:** Stored in `localStorage` under the key `volunteers` (array)
- **Current volunteer:** Active volunteer stored under `currentVolunteer` (object)
- **Survey responses:** Stored under the key `surveys` (array)

### Data Structure

#### Volunteer Data
```json
{
  "id": "timestamp",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "availability": "string",
  "experience": "string",
  "registeredAt": "ISO timestamp"
}
```

#### Survey Data
```json
{
  "id": "timestamp",
  "volunteerId": "string",
  "volunteerName": "string",
  "location": "string",
  "date": "YYYY-MM-DD",
  "timeOfDay": "string",
  "weatherConditions": "string",
  "trafficLevel": "string",
  "pedestrianCount": "string",
  "cyclistCount": "string",
  "publicTransportUsage": "string",
  "parkingAvailability": "string",
  "noiseLevel": "string",
  "airQuality": "string",
  "greenSpaces": "string",
  "commercialActivity": "string",
  "residentialActivity": "string",
  "infrastructureCondition": "string",
  "safetyPerception": "string",
  "accessibility": "string",
  "additionalObservations": "string",
  "submittedAt": "ISO timestamp"
}
```

## Future Enhancements

Potential improvements for production use:

1. **Backend Integration:**
   - Replace localStorage with API calls to a backend server
   - Database storage (PostgreSQL, MongoDB, etc.)
   - User authentication and authorization

2. **Data Export:**
   - Export survey results to CSV/Excel
   - Generate reports and analytics
   - Data visualization dashboards

3. **Enhanced Features:**
   - Photo upload capability for survey locations
   - GPS location tracking
   - Multi-language support
   - Email notifications
   - Admin dashboard for managing volunteers and surveys

4. **Mobile Optimization:**
   - Progressive Web App (PWA) capabilities
   - Offline data collection
   - Native mobile app versions

## License

This project is created for the BPP survey initiative.

## Support

For questions or issues, please contact the survey administrators.
