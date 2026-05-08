import { Router } from 'express'
import { OpenAI } from 'openai'

const router = Router()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// POST /api/matches
router.post('/', async (req, res) => {
  try {
    const { userSkills, jobRequirements, useAI = true } = req.body

    if (!userSkills || !jobRequirements) {
      return res.status(400).json({
        error: 'Both userSkills and jobRequirements are required'
      })
    }

    let matchScore = 0
    let analysis = ''

    if (useAI && process.env.OPENAI_API_KEY) {
      // Use AI for intelligent matching
      const prompt = `
        Compare user skills with job requirements and provide a match score (0-100) and brief analysis.

        User Skills: ${Array.isArray(userSkills) ? userSkills.join(', ') : userSkills}
        Job Requirements: ${Array.isArray(jobRequirements) ? jobRequirements.join(', ') : jobRequirements}

        Please respond with:
        Score: [number 0-100]
        Analysis: [brief explanation]
      `

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200
      })

      const response = completion.choices[0]?.message?.content || ''

      // Parse the response
      const scoreMatch = response.match(/Score:\s*(\d+)/i)
      const analysisMatch = response.match(/Analysis:\s*(.+)/i)

      matchScore = scoreMatch ? parseInt(scoreMatch[1]) : 50
      analysis = analysisMatch ? analysisMatch[1].trim() : 'AI analysis not available'

    } else {
      // Simple keyword matching fallback
      const userSkillSet = new Set(
        Array.isArray(userSkills)
          ? userSkills.map(s => s.toLowerCase().trim())
          : userSkills.toLowerCase().split(',').map(s => s.trim())
      )

      const jobSkillSet = new Set(
        Array.isArray(jobRequirements)
          ? jobRequirements.map(s => s.toLowerCase().trim())
          : jobRequirements.toLowerCase().split(',').map(s => s.trim())
      )

      const intersection = new Set([...userSkillSet].filter(x => jobSkillSet.has(x)))
      matchScore = Math.round((intersection.size / jobSkillSet.size) * 100)
      analysis = `Found ${intersection.size} matching skills out of ${jobSkillSet.size} required skills`
    }

    res.json({
      matchScore: Math.min(100, Math.max(0, matchScore)),
      analysis,
      userSkills: Array.isArray(userSkills) ? userSkills : userSkills.split(',').map(s => s.trim()),
      jobRequirements: Array.isArray(jobRequirements) ? jobRequirements : jobRequirements.split(',').map(s => s.trim()),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Matching error:', error)
    res.status(500).json({ error: 'Failed to perform skill matching' })
  }
})

// POST /api/matches/batch
router.post('/batch', async (req, res) => {
  try {
    const { userSkills, jobs } = req.body

    if (!userSkills || !jobs || !Array.isArray(jobs)) {
      return res.status(400).json({
        error: 'userSkills and jobs array are required'
      })
    }

    const matches = await Promise.all(
      jobs.map(async (job: any) => {
        const matchResponse = await fetch(`${req.protocol}://${req.get('host')}/api/matches`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userSkills,
            jobRequirements: job.skills || job.requirements
          })
        })

        const matchData = await matchResponse.json()
        return {
          job,
          matchScore: matchData.matchScore,
          analysis: matchData.analysis
        }
      })
    )

    // Sort by match score (highest first)
    matches.sort((a, b) => b.matchScore - a.matchScore)

    res.json({
      matches,
      totalJobs: jobs.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Batch matching error:', error)
    res.status(500).json({ error: 'Failed to perform batch matching' })
  }
})

export default router