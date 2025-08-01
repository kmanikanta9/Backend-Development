

const express=require('express')
const { allTickets, addTicket, updateTicket, deleteTicket, getTicketById, updateStatus } = require('../controllers/ticket.controller')
const dataCheck = require('../middlewares/deckCheck')


const ticketRouter = express.Router()

ticketRouter.get('/all-tickets',allTickets)

ticketRouter.post('/add-ticket',dataCheck,addTicket)

ticketRouter.put('/update-ticket/:id',updateTicket)

ticketRouter.delete('/delete-ticket/:id',deleteTicket)

ticketRouter.get('/ticketbyId/:id',getTicketById)

ticketRouter.patch('/update-status/:id',updateStatus)

module.exports =ticketRouter;


