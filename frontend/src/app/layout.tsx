import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SkillBridge - AI-Powered Job Matching',
  description: 'Connect job seekers with opportunities through intelligent skill matching and career guidance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}