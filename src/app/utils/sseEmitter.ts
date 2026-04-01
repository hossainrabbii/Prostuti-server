import { Response } from "express";

// stores all connected SSE clients
let clients: Response[] = [];

export const addClient = (res: Response) => {
  clients.push(res);
};

export const removeClient = (res: Response) => {
  clients = clients.filter((c) => c !== res);
};

export const emitEvent = (event: string, data: object) => {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  clients.forEach((client) => client.write(payload));
};