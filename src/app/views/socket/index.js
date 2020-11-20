import io from 'socket.io-client';
const socket = io('http://localhost:5000');
console.log('socket connect ne', socket);
export default socket;
