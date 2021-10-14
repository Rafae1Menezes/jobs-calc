const Job = require('../model/Job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')

module.exports = {
  create: (req, res) => {
    return res.render('job')
  },
  async save (req, res) {
    //console.log(req.body)
    //{ name: 'site', 'daily-hours': '4', 'total-hours': '5' }

    const jobs = await Job.get()
    //const lastId = jobs[jobs.length - 1]?.id || 0 //adiciona 1 ao valor do útlimo Id ou coloca id = 0

    Job.creat({
      name: req.body.name,
      'daily-hours': Number(req.body['daily-hours']),
      'total-hours': Number(req.body['total-hours']),
      createadAt: Date.now(),
    })

    return res.redirect('/')
  },
  async show (req, res) {
    const jobId = Number(req.params.id)
    const jobs = await Job.get()
    const profile = await Profile.get()

    const job = jobs.find(job => job.id === jobId)

    if (!job) {
      return res.send('Job not found!')
    }

    job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

    return res.render('job-edit', { job })
  },
  async update (req, res) {
  /* const job = jobs.find(job => job.id === jobId) */ 
  /* const newJobs = jobs.map(job => {
      if (job.id === jobId) {
        job = updatedJob
      }
      return job
    }) */

    const jobId = Number(req.params.id)

    const updatedJob = {
      name: req.body.name,
      'total-hours': Number(req.body['total-hours']),
      'daily-hours': Number(req.body['daily-hours']),
    }    

    Job.update(updatedJob, jobId)

    return res.redirect('/job/' + jobId)
  },
  async delete (req, res) {
    const jobId = Number(req.params.id)    
    await Job.delete(jobId)

    return res.redirect('/')
  },
}
