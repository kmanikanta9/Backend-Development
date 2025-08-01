

const fs =  require('fs')

const getData = ()=>{
    let data = JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let books = data.books;

    return {data, books}
}

const addOrUpdateBook = (data)=>{
    fs.writeFileSync('./db.json', JSON.stringify(data))
}

module.exports =  {getData,addOrUpdateBook}