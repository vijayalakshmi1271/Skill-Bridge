'use client'

import { useState } from 'react'

export default function Home() {
  const [skills, setSkills] = useState('')
  const [matches, setMatches] = useState<any[]>([])

  const handleSkillMatch = async () => {
    // TODO: Implement skill matching with your API
    console.log('Matching skills:', skills)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          SkillBridge
        </h1>
        <p className="text-xl text-center mb-12 text-gray-600">
          AI-powered job matching platform connecting talent with opportunities
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Find Your Perfect Match</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your skills (comma-separated)
              </label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., JavaScript, React, Node.js, Python, SQL..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>

            <button
              onClick={handleSkillMatch}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Find Matching Jobs
            </button>
          </div>

          {matches.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Recommended Jobs</h3>
              <div className="space-y-4">
                {matches.map((match, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold">{match.title}</h4>
                    <p className="text-gray-600">{match.company}</p>
                    <p className="text-sm text-gray-500 mt-2">{match.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}