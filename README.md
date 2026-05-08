# PP - PowerApps Component Framework (PCF) Control

A PowerApps Component Framework control that embeds an external web application (Skill Bridge) into a Power App using an iframe.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Building & Deployment](#building--deployment)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 📝 Project Overview

This project implements a custom PowerApps Component Framework (PCF) control named **`pp`** that serves as a bridge between Power Apps and external web applications. The control embeds an external Skill Bridge application within a Power App interface using a sandboxed iframe.

### Purpose
- Integrate external web applications seamlessly into Power Apps
- Provide secure communication between Power App and external web apps
- Maintain responsive design across different screen sizes

---

## 🗂️ Project Structure

```
c:\pj\pp\
├── pp/                           # Main PCF Control folder
│   ├── index.ts                  # Main control implementation
│   ├── ControlManifest.Input.xml # Control manifest configuration
│   └── generated/
│       └── ManifestTypes.d.ts   # Auto-generated TypeScript types
├── obj/                          # Build output and NuGet packages
│   ├── Debug/
│   └── PowerAppsToolsTemp_au/    # Temporary build artifacts
├── package.json                  # NPM dependencies and scripts
├── pcfconfig.json                # PCF configuration
├── pp.pcfproj                    # Project file (C#/.NET)
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs             # ESLint configuration
└── README.md                      # This file
```

### Key Files

| File | Purpose |
|------|---------|
| `pp/index.ts` | Main control class and lifecycle implementation |
| `pp/ControlManifest.Input.xml` | Metadata about the control (properties, resources, domain allowlist) |
| `package.json` | Dependencies and build scripts |
| `pcfconfig.json` | PCF build output configuration |
| `tsconfig.json` | TypeScript compiler options |

---

## ✨ Features

- **Iframe Embedding**: Seamlessly embeds external web applications using sandboxed iframes
- **Responsive Design**: Dynamically adjusts iframe size based on allocated height and width
- **Lazy Loading**: Implements lazy loading for performance optimization
- **Security**: Uses iframe sandbox attributes to restrict capabilities
- **External Domain Support**: Configured to allow `skill-bridge-two-zeta.vercel.app` domain
- **Fullscreen Support**: Enables fullscreen capability for embedded content
- **TypeScript Support**: Fully typed with TypeScript for better development experience

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **PowerApps CLI** - Install via `npm install --global @microsoft/power-platform-cli`
- **.NET Framework** (for building the project)
- **Visual Studio Code** (recommended)
- **Power Apps Account** - For testing and deployment

---

## 🚀 Installation

### Step 1: Clone/Open the Project

```bash
cd c:\pj\pp
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- PCF Scripts
- TypeScript
- ESLint
- Power Apps Component Framework types

### Step 3: Verify Installation

```bash
npm run build
```

---

## ⚙️ Configuration

### External Domain Configuration

The control is configured to communicate with an external domain. Update the domain allowlist in `pp/ControlManifest.Input.xml`:

```xml
<external-service-usage enabled="true">
  <domain>skill-bridge-two-zeta.vercel.app</domain>
</external-service-usage>
```

To add more domains, add additional `<domain>` elements.

### Update Site URL

The embedded site URL is configured in `pp/index.ts`:

```typescript
private readonly _siteUrl = "https://skill-bridge-two-zeta.vercel.app/";
```

To change the target application, modify this URL.

### Iframe Sandbox Permissions

Current sandbox permissions (in `pp/index.ts`):

```
allow-scripts                    // Execute JavaScript
allow-same-origin                // Access same-origin resources
allow-forms                      // Submit forms
allow-popups                     // Open new windows
allow-popups-to-escape-sandbox   // Popups can escape sandbox restrictions
```

Adjust these based on your security requirements.

---

## 📜 Available Scripts

### Build Scripts

```bash
# Build the project
npm run build

# Clean build artifacts
npm run clean

# Rebuild (clean + build)
npm run rebuild
```

### Development Scripts

```bash
# Start development server with watch mode
npm run start:watch

# Start development server
npm run start
```

### Code Quality

```bash
# Run ESLint checks
npm run lint

# Fix ESLint issues automatically
npm run lint:fix
```

### Utilities

```bash
# Refresh TypeScript types from manifest
npm run refreshTypes
```

---

## 💻 Development Workflow

### 1. Start Development Server

```bash
npm run start:watch
```

This will:
- Watch for file changes
- Automatically rebuild on changes
- Start a local dev server for testing

### 2. Make Changes

Edit `pp/index.ts` or related files. The watcher will automatically rebuild.

### 3. Test Locally

The development server provides a test harness in your browser (typically at `http://localhost:3000` or similar).

### 4. Check Code Quality

```bash
npm run lint:fix
```

### 5. Commit Changes

Ensure your code passes linting before committing.

---

## 🔨 Building & Deployment

### Build for Production

```bash
npm run build
```

Output files will be in the `out/controls/` directory.

### Create Solution Package

1. Build the control:
   ```bash
   npm run build
   ```

2. The compiled control will be available in `out/controls/`

3. Import into Power Apps:
   - Create a solution in Power Apps
   - Add the control component
   - Use the control in your apps

### Publish to Power Apps Environment

1. Install Power Apps CLI (if not already installed):
   ```bash
   npm install --global @microsoft/power-platform-cli
   ```

2. Authenticate:
   ```bash
   pac auth create --url https://YOUR_ENV.crm.dynamics.com
   ```

3. Push the control:
   ```bash
   pac pcf push --publisher-prefix ppj
   ```

---

## 🏗️ Architecture

### Component Lifecycle

The `pp` class implements the `ComponentFramework.StandardControl` interface:

```
init()           → Initialize control, create iframe, set up container
   ↓
updateView()     → Update dimensions and layout when context changes
   ↓
getOutputs()     → Return output values (if any)
   ↓
destroy()        → Clean up resources, remove DOM elements
```

### Data Flow

```
Power App Context
       ↓
   init() → Create iframe → Load external app
       ↓
  updateView() → Resize based on available space
       ↓
External App (Skill Bridge) ← Communicates via iframe
```

### iframe Security Model

- **Sandboxed**: Restricted iframe prevents unauthorized access
- **Same-origin policy**: Limited to configured domains
- **Fullscreen allowed**: Users can expand embedded app to fullscreen

---

## 🛠️ Technologies

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Type-safe JavaScript development |
| **Power Apps Component Framework (PCF)** | Component model for Power Apps |
| **HTML5/CSS3** | UI rendering |
| **ESLint** | Code quality and style checking |
| **npm** | Package management |
| **.NET** | Build infrastructure |

### Dependencies

- `@types/powerapps-component-framework`: PCF type definitions
- `typescript`: TypeScript compiler
- `pcf-scripts`: PCF build tools
- `@types/node`: Node.js type definitions
- ESLint plugins: Code quality tools

---

## 🐛 Troubleshooting

### Issue: "Cannot find module" errors

**Solution:**
```bash
npm install
npm run refreshTypes
npm run build
```

### Issue: ESLint errors

**Solution:**
```bash
npm run lint:fix
```

### Issue: iframe not loading

**Check:**
1. External domain is added to `ControlManifest.Input.xml`
2. Domain CORS headers are configured correctly
3. Site URL is correct in `index.ts`
4. Sandbox permissions include `allow-scripts` and `allow-same-origin`

### Issue: Control not visible in Power Apps

**Check:**
1. Build completed successfully: `npm run build`
2. Solution was created with compiled control
3. Control was published to environment
4. Publisher prefix matches (`ppj` in this project)

### Issue: Dimensions not updating

**Solution:**
Ensure `updateView()` is being called by Power Apps context. Check that:
- `context.mode.allocatedHeight` is available
- Container element exists
- No CSS overflow hidden on parent elements

---

## 📚 Additional Resources

- [Power Apps Component Framework Documentation](https://docs.microsoft.com/en-us/power-apps/developer/component-framework/overview)
- [PCF Samples on GitHub](https://github.com/microsoft/PowerApps-Samples/tree/master/component-framework)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/)

---

## 🤝 Contributing

### Guidelines

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run code quality checks: `npm run lint:fix`
4. Test thoroughly
5. Commit with clear messages
6. Push and create a pull request

### Code Style

- Follow the ESLint rules configured in `eslint.config.mjs`
- Use TypeScript for type safety
- Add comments for complex logic
- Keep functions small and focused

---

## 📄 License

This project is part of the Power Apps ecosystem. Check with your organization for licensing details.

---

## 📞 Support & Contact

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review Power Apps documentation
3. Contact your development team

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.0.1 | 2026-05-08 | Initial release - iframe-based control for Skill Bridge integration |

---

## 🎯 Project Plan & Roadmap

### Current Status
- ✅ Basic iframe embedding working
- ✅ Responsive sizing implemented
- ✅ Security sandbox configured
- ✅ External domain allowlisting configured

### Planned Features (v0.1.0+)
- [ ] Add postMessage communication between Power App and iframe
- [ ] Implement data binding for inputs/outputs
- [ ] Add configuration UI for URL customization
- [ ] Create error handling and loading states
- [ ] Add logging and debugging capabilities
- [ ] Performance monitoring

### Known Limitations
1. Currently no data binding - control is display-only
2. Limited inter-app communication (no postMessage yet)
3. No custom styling options for iframe wrapper
4. Requires external domain in manifest

### Future Enhancements
- Real-time synchronization between Power App and embedded app
- Multiple iframe support
- Theme customization
- Analytics integration
- A/B testing capabilities

---

Last Updated: May 8, 2026
