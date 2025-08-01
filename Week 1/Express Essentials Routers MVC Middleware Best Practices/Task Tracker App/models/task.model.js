

const fs =  require('fs')

const getData = ()=>{
    let data = JSON.parse(fs.readFileSync('./task.json','utf-8'))
    let tasks = data.tasks;

    return {data, tasks}
}

const addOrUpdate = (data)=>{
    fs.writeFileSync('./task.json', JSON.stringify(data))
}

module.exports =  {getData,addOrUpdate}