# SkillBridge System Architecture

## Overview

SkillBridge is a comprehensive AI-powered job matching platform that connects job seekers with career opportunities through intelligent skill analysis and automated workflows. The system integrates multiple Microsoft technologies with AI services to create a seamless recruitment experience.

## System Components

### 1. Frontend Layer (Vercel)
**Location:** `/frontend`
**Technology:** Next.js 14, React, TypeScript
**Purpose:** User interface for job seekers and employers

**Key Features:**
- Skill input and analysis interface
- Job search and filtering
- User dashboard and profile management
- Real-time matching results
- Responsive design for mobile and desktop

**Deployment:** Vercel (skill-bridge-two-zeta.vercel.app)

### 2. API Layer (Node.js/Express)
**Location:** `/api`
**Technology:** Node.js, Express, TypeScript
**Purpose:** Business logic and AI integration

**Key Features:**
- RESTful API endpoints
- AI-powered skill matching (OpenAI GPT + Google Gemini)
- Job data management
- User authentication and authorization
- Integration with external job boards

**Endpoints:**
- `POST /api/skills/analyze` - Analyze user skills
- `GET /api/jobs` - Retrieve job listings
- `POST /api/matches` - Perform skill-job matching

### 3. PCF Control Layer (Power Apps)
**Location:** `/pcf-control`
**Technology:** Power Apps Component Framework, TypeScript
**Purpose:** Embed SkillBridge in Power Apps

**Key Features:**
- Iframe-based integration
- Responsive sizing
- Secure sandbox environment
- Cross-origin communication support

**Integration:** Allows Power Apps to embed the full SkillBridge interface

### 4. Automation Layer (Power Automate)
**Location:** `/flows`
**Technology:** Microsoft Power Automate
**Purpose:** Workflow automation and notifications

**Key Flows:**
- Job matching notifications
- New job posting processing
- User registration workflows
- Periodic skill assessment reminders

### 5. Data Layer (SharePoint)
**Technology:** Microsoft SharePoint Online
**Purpose:** Data storage and document management

**Lists/Tables:**
- User Profiles
- Job Postings
- Skill Assessments
- Match History
- Application Tracking

## Data Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Power Apps    │    │   Frontend      │    │   External      │
│   (PCF Control) │◄──►│   (Vercel)      │◄──►│   Job Boards    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Power         │    │   API Layer     │    │   AI Services   │
│   Automate      │◄──►│   (Node.js)     │◄──►│   (OpenAI +     │
│   Flows         │    │                 │    │    Gemini)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   SharePoint    │    │   Database      │    │   Email/Teams   │
│   Lists         │    │   (MongoDB)     │    │   Notifications │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Technology Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **HTTP Client:** Axios

### Backend API
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **AI Integration:** OpenAI GPT-3.5, Google Gemini
- **Database:** MongoDB (planned)
- **Authentication:** JWT (planned)

### Power Apps Integration
- **Framework:** Power Apps Component Framework (PCF)
- **Language:** TypeScript
- **Rendering:** HTML5 Canvas
- **Communication:** PostMessage API (planned)

### Automation
- **Platform:** Microsoft Power Automate
- **Connectors:** SharePoint, Outlook, Teams, HTTP
- **Triggers:** Scheduled, HTTP Request, List Events

### Data Storage
- **Primary:** Microsoft SharePoint Online
- **Backup:** MongoDB Atlas (planned)
- **Files:** SharePoint Document Libraries

## Security Considerations

### Authentication & Authorization
- JWT tokens for API authentication
- Azure AD integration for enterprise users
- Role-based access control (RBAC)

### Data Protection
- HTTPS everywhere
- API key encryption
- Sensitive data masking
- GDPR compliance measures

### Network Security
- CORS configuration
- Rate limiting
- Input validation and sanitization
- Secure iframe sandboxing

## Deployment Architecture

### Development Environment
- Local development with hot reload
- Docker containers for services
- Local MongoDB instance
- ngrok for webhook testing

### Production Environment
- Vercel for frontend deployment
- Azure App Service for API
- MongoDB Atlas for database
- Power Automate cloud flows
- SharePoint Online for data

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Database connection pooling
- CDN for static assets
- Load balancer configuration

### Performance Optimization
- API response caching
- Database query optimization
- Lazy loading in frontend
- Image optimization

## Monitoring & Logging

### Application Monitoring
- API response times
- Error rates and types
- User activity tracking
- AI service usage metrics

### Infrastructure Monitoring
- Server health checks
- Database performance
- Power Automate flow success rates
- SharePoint storage usage

## Future Enhancements

### Phase 2 Features
- Advanced AI matching algorithms
- Video interview integration
- Skills certification tracking
- Employer analytics dashboard

### Phase 3 Features
- Mobile native apps
- Integration with LinkedIn Learning
- Advanced reporting and analytics
- Multi-tenant architecture

## Development Workflow

1. **Frontend Development:** Vercel deployment from `/frontend`
2. **API Development:** Local Node.js server with auto-restart
3. **PCF Development:** Power Platform CLI build and deploy
4. **Flow Development:** Power Automate designer
5. **Testing:** Unit tests, integration tests, E2E tests
6. **CI/CD:** GitHub Actions for automated deployment

## Environment Configuration

See `.env.example` files in each component directory for required environment variables.

## API Documentation

API endpoints are documented using OpenAPI/Swagger format. Access the API documentation at `/api/docs` when the API server is running.