import io from 'socket.io-client';
const socket = io('https://cn-web-socket.herokuapp.com/');
console.log('socket connect ne', socket);
export default socket;
