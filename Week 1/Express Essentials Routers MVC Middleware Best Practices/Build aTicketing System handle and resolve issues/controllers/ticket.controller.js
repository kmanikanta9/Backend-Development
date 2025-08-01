const { getData, addOrUpdateTicket } = require("../models/ticket.model");

const allTickets = (req, res) => {
  let tickets = getData().tickets;
  console.log(tickets)
  res.status(200).json({ msg: "All Tickets", tickets });
};

const addTicket = (req, res) => {
  let newTicket = req.body;
  const {data,tickets}=getData()

  tickets.push(newTicket);
  addOrUpdateTicket(data);
  res.status(201).json({ msg: "New Ticket Added", newTicket });
};

const updateTicket = (req, res) => {
  let id = req.params.id;
  let updatedTicket = req.body;
  let data = getData().data;
  let tickets = getData().tickets;

  let index = tickets.findIndex((ticket) => ticket.id == id);
  if (index == -1) {
    res.status(201).json({ msg: "Ticket not Found" });
  } else {
    let updatedTickets = tickets.map((el, i) => {
      if (el.id == id) {
        return { ...el, ...updatedTicket };
      } else {
        return el;
      }
    });
    data.tickets = updatedTickets;
    addOrUpdateTicket(data);
    res.status(201).json({ msg: "Ticket has updated" });
  }
};

const deleteTicket = (req, res) => {
    let id = req.params.id;
  let data = getData().data;
  let tickets = getData().tickets;
  let index = tickets.findIndex((ticket) => ticket.id === id);

  if (index == -1) {
    res.status(404).json({ msg: "Ticket Not Found" });
  } 
  else{

      let deleted = tickets.filter((ticket) => ticket.id != id);
      data.tickets = deleted;
      addOrUpdateTicket(data);
      res.status(200).json({ msg: "Ticket has deleted."});
  }
};

const getTicketById = (req, res) => {
  let tickets = getData().tickets;
  let id=req.params.id

  let index = tickets.findIndex((ticket) => ticket.id == id);
  if (index == -1) {
    res.status(404).json({ msg: "Ticket not found" });
  } else {
    tickets.forEach((el, i) => {
      if (el.id == id) {
        res.status(201).json({ msg: "Ticket", ticket: el });
      }
    });
  }
};
const updateStatus = (req,res)=>{
  let id=req.params.id
  let data= getData().data;
  let tickets = getData().tickets;
  

  let index=tickets.findIndex(ticket=>ticket.id==id)
  if(index==-1){
    res.status(404).json({msg:"Ticket not found"})
  }
  else{

    tickets[index].status="resolved"
    data.tickets=tickets
    addOrUpdateTicket(data)
    res.status(200).json({msg:"Status updated"})

  }

}
module.exports = {
  addTicket,
  updateTicket,
  getTicketById,
  deleteTicket,
  allTickets,
  updateStatus
};
