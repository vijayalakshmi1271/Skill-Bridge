# Power Automate Flows for SkillBridge

This folder should contain exported Power Automate flow packages (.zip files) that automate various processes in the SkillBridge system.

## Required Flows

### 1. Job Matching Notification Flow
**File:** `job-matching-notification.zip`

**Purpose:** Automatically sends notifications when high-skill matches are found.

**Triggers:**
- HTTP Request (from API when match score > 80%)
- Scheduled (daily summary)

**Actions:**
- Get user contact information from SharePoint
- Send email notification
- Create task in Microsoft To Do
- Log to SharePoint list

### 2. New Job Posting Flow
**File:** `new-job-posting.zip`

**Purpose:** Processes new job postings and triggers matching.

**Triggers:**
- SharePoint list item created/updated
- HTTP Request from external job boards

**Actions:**
- Extract job requirements
- Call SkillBridge API for matching
- Send notifications to matched candidates
- Update job status in database

### 3. User Registration Flow
**File:** `user-registration.zip`

**Purpose:** Handles new user onboarding.

**Triggers:**
- HTTP Request from frontend registration

**Actions:**
- Create user profile in SharePoint
- Send welcome email
- Set up initial skill assessment
- Create user dashboard

### 4. Skill Assessment Reminder Flow
**File:** `skill-assessment-reminder.zip`

**Purpose:** Sends periodic reminders for skill updates.

**Triggers:**
- Recurrence (weekly/monthly)
- User inactivity detected

**Actions:**
- Query users due for assessment
- Send reminder emails
- Update reminder status

## How to Export Flows

1. Open Power Automate (https://flow.microsoft.com)
2. Go to "My flows"
3. Select the flow you want to export
4. Click "Export" > "Package (.zip)"
5. Choose "Update" for the import setup
6. Download the .zip file
7. Place it in this `/flows` folder

## Import Instructions

To import these flows in a new environment:

1. Go to Power Automate > "Import"
2. Upload the .zip file
3. Configure connections (SharePoint, Outlook, etc.)
4. Update any environment-specific URLs or IDs
5. Test the flow

## Environment Variables Required

Make sure these connections are configured:
- SharePoint (for data storage)
- Outlook (for email notifications)
- Microsoft Teams (for team notifications)
- Azure AD (for user authentication)