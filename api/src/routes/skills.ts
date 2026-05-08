import { Router } from 'express'
import { OpenAI } from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

const router = Router()

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// POST /api/skills/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { skills, useGPT = true } = req.body

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: 'Skills array is required' })
    }

    let analysis

    if (useGPT && process.env.OPENAI_API_KEY) {
      // Use OpenAI GPT
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a career counselor. Analyze the provided skills and suggest career paths, job titles, and skill gaps."
          },
          {
            role: "user",
            content: `Analyze these skills: ${skills.join(', ')}`
          }
        ]
      })

      analysis = completion.choices[0]?.message?.content
    } else if (process.env.GEMINI_API_KEY) {
      // Use Google Gemini as fallback
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      const result = await model.generateContent(`Analyze these skills for career development: ${skills.join(', ')}`)
      analysis = result.response.text()
    } else {
      return res.status(500).json({ error: 'No AI service configured' })
    }

    res.json({
      skills,
      analysis,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Skill analysis error:', error)
    res.status(500).json({ error: 'Failed to analyze skills' })
  }
})

// GET /api/skills/suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const { category } = req.query

    // This would typically fetch from a database
    const suggestions = {
      'programming': ['JavaScript', 'Python', 'Java', 'C#', 'React', 'Node.js'],
      'design': ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'],
      'data': ['SQL', 'Python', 'R', 'Tableau', 'Power BI', 'Machine Learning'],
      'default': ['Communication', 'Problem Solving', 'Team Work', 'Leadership']
    }

    const skills = suggestions[category as keyof typeof suggestions] || suggestions.default

    res.json({ skills, category: category || 'general' })

  } catch (error) {
    console.error('Skill suggestions error:', error)
    res.status(500).json({ error: 'Failed to get skill suggestions' })
  }
})

export default router