// const EventEmitter = require('events')

// const emiter = new EventEmitter()

// emiter.on('valod', (data) => console.log(data));

// emiter.emit('valod', 'barev Valod dzya')


fetch('http://localhost:3003/api/users/', {
    method : "POST",
    headers : {
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({name : "Avetis", age : 45})
})
