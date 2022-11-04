import http from './http.api';

const TicketApi = new http('/ticket');

TicketApi.getTickets = function () {
  return this.instance.get(`${this.baseApisUrl}`);
};

TicketApi.getTicket = function (id) {
  return this.instance.get(`${this.baseApisUrl}/${id}`);
};

export { TicketApi };
