const JobUtils = require("../utils/jobUtils")
const Job = require("../model/Job")
const Profile = require("../model/Profile")

module.exports = {
    async save(req, res) {         
        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"], //push de dias por hora
            "total-hours": req.body["total-hours"], // push de horas total do projeto
            created_at: Date.now() //atribuindo date de hoje
        })

        return res.redirect('/')
    },
    create(req, res) {
        return res.render("job")
    },
    async show(req, res) {
        const jobId = req.params.id
        const jobs = await Job.get()

        
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        const profile = await Profile.get()


        if (!job) {
            return res.send('Job not found')
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })

    },
    async update(req, res) {
        const jobId = req.params.id
        
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

      
        await Job.update(updatedJob, jobId)

        res.redirect("/job/" + jobId)
    },
    async delete(req, res) {
        const jobId = req.params.id

        await Job.delete(jobId)

        return res.redirect('/')
    }
}