import { Router } from 'express'

const router = Router()

// Mock job data - in production, this would come from a database
const mockJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$80k - $120k',
    skills: ['JavaScript', 'React', 'CSS', 'HTML'],
    description: 'Build amazing user interfaces with modern web technologies.'
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    salary: '$90k - $130k',
    skills: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
    description: 'Develop end-to-end web applications using MERN stack.'
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'DataDriven Inc',
    location: 'San Francisco, CA',
    salary: '$70k - $100k',
    skills: ['Python', 'SQL', 'Tableau', 'Statistics'],
    description: 'Analyze business data and create insightful reports.'
  }
]

// GET /api/jobs
router.get('/', (req, res) => {
  try {
    const { skills, location, limit = 10 } = req.query

    let filteredJobs = [...mockJobs]

    // Filter by skills if provided
    if (skills) {
      const skillArray = skills.toString().split(',').map(s => s.trim().toLowerCase())
      filteredJobs = filteredJobs.filter(job =>
        job.skills.some(skill => skillArray.includes(skill.toLowerCase()))
      )
    }

    // Filter by location if provided
    if (location) {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(location.toString().toLowerCase())
      )
    }

    // Limit results
    const limitedJobs = filteredJobs.slice(0, parseInt(limit.toString()))

    res.json({
      jobs: limitedJobs,
      total: filteredJobs.length,
      filters: { skills, location }
    })

  } catch (error) {
    console.error('Jobs fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch jobs' })
  }
})

// GET /api/jobs/:id
router.get('/:id', (req, res) => {
  try {
    const jobId = parseInt(req.params.id)
    const job = mockJobs.find(j => j.id === jobId)

    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }

    res.json({ job })

  } catch (error) {
    console.error('Job fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch job' })
  }
})

// POST /api/jobs (for future job posting feature)
router.post('/', (req, res) => {
  // This would create a new job posting
  res.status(501).json({ message: 'Job posting feature coming soon' })
})

export default router