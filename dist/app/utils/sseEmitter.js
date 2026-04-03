// stores all connected SSE clients
let clients = [];
export const addClient = (res) => {
    clients.push(res);
};
export const removeClient = (res) => {
    clients = clients.filter((c) => c !== res);
};
export const emitEvent = (event, data) => {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    clients.forEach((client) => client.write(payload));
};
//# sourceMappingURL=sseEmitter.js.map