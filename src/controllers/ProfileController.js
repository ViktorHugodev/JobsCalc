const Profile = require('../model/Profile')

module.exports = {
        async index(req, res) {
            return res.render("profile", { profile: await Profile.get() })
        },
        async update(req, res) {
            //req.body para pegar os dados
            const data = req.body
            //definir quantas semenas tem um ano, remover as semanas de ferias: 52
            const weekPerYear = 52
            //quantos dias por semana de work
            const weekPerMonth = (weekPerYear - data["vacation-per-year"]) / 12

            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
            //total de horas trabalhadas na semana 
            const monthlyTHours = weekTotalHours * weekPerMonth


            //Valor da hora media ALMEJADA
            const valueHour = data["monthly-budget"] / monthlyTHours

            await Profile.update({
                ...await Profile.get(),
                ...req.body,
                "value-hour": valueHour
            }) 
          

            return res.redirect('/profile')
        }
    }