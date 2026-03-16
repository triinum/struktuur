import { 
BuyTicket,
findTicketByEventIdService,
deleteTicket,
getUserTickets
 } from "../services/ticketServices";
import { NextFunction, Request, Response, Router } from "express";


const EventTicketRouter = Router();

EventTicketRouter.post("/create", BuyTicket);
EventTicketRouter.post("/event-tickets", findTicketByEventIdService);
EventTicketRouter.delete("/delete/:id", deleteTicket);
EventTicketRouter.get("/all", getUserTickets);

export default EventTicketRouter;