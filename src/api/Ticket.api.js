import http from './http.api';

const TicketApi = new http('/ticket');

TicketApi.getTickets = function () {
  return this.instance.get(`${this.baseApisUrl}`);
};

TicketApi.getTicketReplies = function (id) {
  return this.instance.get(`${this.baseApisUrl}/replies/${id}`);
};

TicketApi.postTicket = function (body) {
  return this.instance.post(`${this.baseApisUrl}`, body);
};

TicketApi.reply = function (config) {
  return this.instance.post(`${this.baseApisUrl}/reply`, config);
};

TicketApi.addReply = function (body) {
  return this.instance.post(`${this.baseApisUrl}/reply`, body);
};

export { TicketApi };
