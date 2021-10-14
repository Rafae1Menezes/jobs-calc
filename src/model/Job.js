const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database()

    const jobs = await db.all(`SELECT * FROM jobs`)

    await db.close()

    return jobs.map((job)=> ({
        id: job.id,
        name: job.name,
        'daily-hours': job.daily_hours,
        'total-hours': job.total_hours,
        createadAt: job.createadAt
    }))

  },
  async update(newJob, jobId) {
    const db = await Database()

    await db.run(`UPDATE jobs SET
        name = '${newJob.name}',
        daily_hours = ${newJob['daily-hours']},
        total_hours = ${newJob['total-hours']}
      WHERE id = ${jobId}
    `)

    await db.close()
  },
  async delete(jobId) {
      const db = await Database()

      await db.run(`DELETE FROM jobs WHERE id = ${jobId}`)

      await db.close()
  },
  async creat(newJob){

    const db = await Database()

    await db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        createadAt )
      VALUES (
        "${newJob.name}",
        ${newJob['daily-hours']},
        ${newJob['total-hours']},
        ${newJob.createadAt}
      ) 

    `)

    db.close()
  }
}
