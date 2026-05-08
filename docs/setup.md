# SkillBridge Setup Guide

This guide will walk you through setting up the complete SkillBridge system from scratch.

## Prerequisites

### Software Requirements
- Node.js 18+ and npm
- Power Apps CLI (`npm install -g @microsoft/power-platform-cli`)
- .NET Framework (for PCF development)
- Visual Studio Code
- Git

### Accounts & Services
- GitHub account
- Vercel account (for frontend deployment)
- OpenAI API account (for GPT integration)
- Google AI Studio account (for Gemini)
- Microsoft 365 account with:
  - Power Apps license
  - Power Automate license
  - SharePoint Online access
  - Azure AD (optional, for enterprise features)

## Step 1: Repository Setup

### Clone the Repository
```bash
git clone https://github.com/vijayalakshmi1271/Skill-Bridge.git
cd Skill-Bridge
```

### Repository Structure
```
Skill-Bridge/
├── frontend/          # Next.js application
├── api/              # Node.js REST API
├── pcf-control/      # Power Apps PCF control
├── flows/            # Power Automate exports
├── docs/             # Documentation
└── README.md         # This file
```

## Step 2: Frontend Setup (Vercel)

### Install Dependencies
```bash
cd frontend
npm install
```

### Environment Configuration
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
```

### Run Development Server
```bash
npm run dev
```
Access at: http://localhost:3000

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## Step 3: API Setup (Node.js)

### Install Dependencies
```bash
cd ../api
npm install
```

### Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
PORT=3001
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
MONGODB_URI=your_mongodb_connection_string
```

### Run API Server
```bash
npm run dev
```
API available at: http://localhost:3001

### Test API Endpoints
```bash
# Health check
curl http://localhost:3001/api/health

# Test skill analysis
curl -X POST http://localhost:3001/api/skills/analyze \
  -H "Content-Type: application/json" \
  -d '{"skills": ["JavaScript", "React", "Node.js"]}'
```

## Step 4: PCF Control Setup

### Install Dependencies
```bash
cd ../pcf-control
npm install
```

### Build the Control
```bash
npm run build
```

### Authenticate with Power Apps
```bash
pac auth create --url https://your-env.crm.dynamics.com
```

### Push to Power Apps Environment
```bash
pac pcf push --publisher-prefix ppj
```

## Step 5: Power Automate Flows Setup

### Import Flows
1. Open [Power Automate](https://flow.microsoft.com)
2. Click "Import" for each .zip file in the `/flows` folder
3. Configure connections:
   - SharePoint (select your site)
   - Outlook (for email notifications)
   - Teams (for team notifications)

### Create Required SharePoint Lists

Create these lists in your SharePoint site:

#### User Profiles List
- Title (Single Line Text)
- Email (Single Line Text)
- Skills (Multiple Lines Text)
- Experience Level (Choice: Junior, Mid, Senior, Expert)
- Last Assessment (Date/Time)

#### Job Postings List
- Title (Single Line Text)
- Company (Single Line Text)
- Description (Multiple Lines Text)
- Required Skills (Multiple Lines Text)
- Salary Range (Single Line Text)
- Location (Single Line Text)
- Status (Choice: Open, Closed, Filled)

#### Applications List
- Job ID (Lookup to Job Postings)
- Applicant Email (Single Line Text)
- Match Score (Number)
- Status (Choice: Applied, Reviewed, Interviewed, Hired, Rejected)

## Step 6: SharePoint Site Setup

### Create Document Libraries
1. **Resumes** - Store candidate resumes
2. **Job Descriptions** - Store detailed job descriptions
3. **Assessments** - Store skill assessment results

### Configure Permissions
- Ensure Power Automate has access to the lists
- Set up appropriate sharing permissions
- Configure Azure AD security groups if needed

## Step 7: Integration Testing

### Test End-to-End Flow
1. **Frontend Testing:**
   - Visit the Vercel deployment
   - Enter skills and test matching
   - Verify job results display

2. **API Testing:**
   - Test all endpoints with Postman/Insomnia
   - Verify AI integration works
   - Check error handling

3. **PCF Control Testing:**
   - Add control to a Power App
   - Test iframe loading
   - Verify responsive behavior

4. **Flow Testing:**
   - Trigger flows manually
   - Check email notifications
   - Verify SharePoint updates

### Cross-System Integration
1. Create a test job posting in SharePoint
2. Trigger the "New Job Posting" flow
3. Verify the job appears in the frontend
4. Test the matching algorithm
5. Check notification delivery

## Step 8: Production Deployment

### Environment Variables
Update all `.env` files with production values:
- Use production API URLs
- Set secure secrets and API keys
- Configure production database connections

### Vercel Production Deployment
```bash
cd frontend
vercel --prod
```

### API Production Deployment
Consider these hosting options:
- **Azure App Service**
- **AWS Elastic Beanstalk**
- **Google Cloud Run**
- **Heroku**

Example Azure deployment:
```bash
az webapp up --name skillbridge-api --resource-group your-rg
```

### Database Setup
- Create MongoDB Atlas cluster
- Set up database user and permissions
- Update connection strings
- Run database migrations if any

### Power Apps Production
- Create production Power Apps environment
- Import solutions to production
- Update PCF control references
- Configure production data sources

## Step 9: Monitoring & Maintenance

### Set Up Monitoring
1. **Application Insights** for API monitoring
2. **Vercel Analytics** for frontend metrics
3. **Power Automate Analytics** for flow performance
4. **SharePoint Usage Reports**

### Backup Strategy
- Database automatic backups (MongoDB Atlas)
- SharePoint site backups
- Flow export backups
- Code repository backups

### Update Process
1. Test updates in development environment
2. Deploy to staging environment
3. Run integration tests
4. Deploy to production
5. Monitor for issues

## Troubleshooting

### Common Issues

#### Frontend Not Loading
- Check Vercel deployment status
- Verify environment variables
- Check browser console for errors

#### API Returning Errors
- Verify API keys are set correctly
- Check database connectivity
- Review API logs

#### PCF Control Not Working
- Ensure control is published to environment
- Check Power Apps permissions
- Verify iframe domain allowlist

#### Flows Not Triggering
- Check Power Automate connections
- Verify SharePoint permissions
- Review flow run history

### Support Resources
- [Power Apps Documentation](https://docs.microsoft.com/power-apps/)
- [Power Automate Documentation](https://docs.microsoft.com/power-automate/)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Security Checklist

- [ ] API keys encrypted and not in version control
- [ ] HTTPS enabled everywhere
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] Authentication enabled
- [ ] Database access restricted
- [ ] Regular security updates applied

## Performance Optimization

- Enable CDN for static assets
- Implement API response caching
- Optimize database queries
- Set up monitoring alerts
- Regular performance testing

---

## Quick Start Commands

```bash
# Clone and setup
git clone https://github.com/vijayalakshmi1271/Skill-Bridge.git
cd Skill-Bridge

# Frontend
cd frontend && npm install && cp .env.example .env.local && npm run dev

# API (new terminal)
cd ../api && npm install && cp .env.example .env && npm run dev

# PCF Control (new terminal)
cd ../pcf-control && npm install && npm run build
```

For detailed deployment instructions, see the individual README files in each component directory.