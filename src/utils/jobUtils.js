module.exports = {
  remainingDays: job => {
    const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
    const createadDate = new Date(job.createadAt)
    const dueDay = createadDate.getDate() + Number(remainingDays)
    const dueDateInMs = createadDate.setDate(dueDay)

    const timeDiffInMs = dueDateInMs - Date.now()

    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

    return dayDiff
  },
  calculateBudget: (job, valueHour) => {
    return job['total-hours'] * valueHour
  },
}
