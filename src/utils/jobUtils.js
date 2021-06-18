module.exports = {
    remainingDays(job) { //Criei uma função separada pra calcular o tempo dos projetos
        //remainingDays vai dividir o total de horas do projeto pelas horas diaria a fim de achar o tempo total gasto com o projeto
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

        //criei uma data com Created_at que é a data que adicionou o novo projeto
        const createdDate = new Date(job.created_at)

        //Pegou a data atual + números de dias restantess pra ver o dia de vencimento
        const dueDay = createdDate.getDate() + Number(remainingDays)

        //criou uma data e setou o dia de recimento
        const dueDateInMs = createdDate.setDate(dueDay)

        //A data de vencimento foi a data atual em milisegundos menos a data de vencimento em milisegundos
        const timeDiffInMs = dueDateInMs - Date.now()
        //transformar miliSegundos em dias
        //               MS   seg   min hora
        const dayInMs = 1000 * 60 * 60 * 24
        //só a formataçao da data que é a diferença em MS 
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}