# SkillBridge - AI-Powered Job Matching Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

SkillBridge is a comprehensive AI-powered job matching platform that connects job seekers with career opportunities through intelligent skill analysis, automated workflows, and seamless Microsoft ecosystem integration.

## 🌟 Features

- **AI-Powered Matching**: Uses OpenAI GPT and Google Gemini for intelligent skill-job matching
- **Multi-Platform Integration**: Works across web, Power Apps, and Microsoft 365
- **Automated Workflows**: Power Automate flows for notifications and job processing
- **Responsive Design**: Modern, mobile-friendly interface built with Next.js
- **Secure Architecture**: Enterprise-grade security with proper authentication and data protection
- **Scalable API**: RESTful API built with Node.js and TypeScript

## 🏗️ Architecture Overview

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

## 📁 Project Structure

```
Skill-Bridge/
├── frontend/             # Next.js web application (Vercel)
│   ├── src/
│   │   ├── app/         # Next.js 14 app router
│   │   └── components/  # React components
│   ├── package.json
│   └── .env.example     # Environment variables template
├── api/                 # Node.js REST API
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   └── index.ts     # Main server file
│   ├── package.json
│   └── .env.example     # API configuration
├── pcf-control/         # Power Apps Component Framework
│   ├── pp/              # PCF control source
│   ├── package.json
│   └── README.md        # PCF-specific documentation
├── flows/               # Power Automate flow exports
│   ├── *.zip            # Exported flow packages
│   └── README.md        # Flow documentation
├── docs/                # Documentation
│   ├── architecture.md  # System architecture details
│   └── setup.md         # Complete setup guide
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Power Apps CLI
- Git
- Microsoft 365 account (for Power Apps/Automate)

### 1. Clone the Repository
```bash
git clone https://github.com/vijayalakshmi1271/Skill-Bridge.git
cd Skill-Bridge
```

### 2. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API keys
npm run dev
```

### 3. Setup API
```bash
cd ../api
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 4. Setup PCF Control
```bash
cd ../pcf-control
npm install
npm run build
pac auth create --url https://your-env.crm.dynamics.com
pac pcf push --publisher-prefix ppj
```

For detailed setup instructions, see [docs/setup.md](docs/setup.md).

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

### Backend API
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **AI Integration**: OpenAI GPT-3.5, Google Gemini
- **Database**: MongoDB (planned)

### Power Apps Integration
- **Framework**: Power Apps Component Framework (PCF)
- **Language**: TypeScript
- **Rendering**: HTML5 Canvas

### Automation
- **Platform**: Microsoft Power Automate
- **Connectors**: SharePoint, Outlook, Teams, HTTP

### Data Storage
- **Primary**: Microsoft SharePoint Online
- **Documents**: SharePoint Document Libraries

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/skills/analyze` | POST | Analyze user skills with AI |
| `/api/skills/suggestions` | GET | Get skill suggestions |
| `/api/jobs` | GET | Retrieve job listings |
| `/api/jobs/:id` | GET | Get specific job details |
| `/api/matches` | POST | Perform skill-job matching |
| `/api/matches/batch` | POST | Batch matching for multiple jobs |

## 🔐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
```

### API (.env)
```env
PORT=3001
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
MONGODB_URI=your_mongodb_uri
```

See `.env.example` files in each directory for complete configuration.

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm install -g vercel
vercel --prod
```

### API (Azure/Heroku/AWS)
```bash
cd api
npm run build
# Deploy dist/ folder to your hosting provider
```

### PCF Control (Power Apps)
```bash
cd pcf-control
pac pcf push --publisher-prefix ppj
```

## 🔄 Development Workflow

1. **Local Development**: Run all components locally with `npm run dev`
2. **Testing**: Test integrations between components
3. **Build**: Use `npm run build` in each component
4. **Deploy**: Deploy components to respective platforms
5. **Monitor**: Check logs and performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Documentation

- **[Architecture](docs/architecture.md)**: Detailed system architecture
- **[Setup Guide](docs/setup.md)**: Complete setup and deployment instructions
- **[PCF Control](pcf-control/README.md)**: Power Apps component documentation
- **[API Documentation](api/README.md)**: API endpoint details

## 🐛 Troubleshooting

### Common Issues
- **Frontend not loading**: Check Vercel deployment and environment variables
- **API errors**: Verify API keys and database connectivity
- **PCF control issues**: Ensure proper Power Apps authentication and permissions
- **Flow failures**: Check Power Automate connections and SharePoint access

See [docs/setup.md](docs/setup.md) for detailed troubleshooting steps.

## 📈 Roadmap

### Phase 1 (Current)
- ✅ AI-powered skill matching
- ✅ Power Apps integration
- ✅ Basic job search functionality
- ✅ Automated notification flows

### Phase 2 (Next)
- 🔄 Advanced AI algorithms
- 🔄 Video interview integration
- 🔄 Skills certification tracking
- 🔄 Employer analytics dashboard

### Phase 3 (Future)
- 📋 Mobile native applications
- 📋 LinkedIn Learning integration
- 📋 Advanced reporting
- 📋 Multi-tenant architecture

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Microsoft Power Platform team for PCF and Power Automate
- OpenAI for GPT API
- Google for Gemini API
- Vercel for hosting platform

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the documentation in the `docs/` folder
- Review troubleshooting guides

---

**Live Demo**: [https://skill-bridge-two-zeta.vercel.app](https://skill-bridge-two-zeta.vercel.app)

**Repository**: [https://github.com/vijayalakshmi1271/Skill-Bridge](https://github.com/vijayalakshmi1271/Skill-Bridge)