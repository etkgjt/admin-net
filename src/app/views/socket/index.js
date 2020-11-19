import io from 'socket.io-client';
const socket = io('http://localhost:5000');
console.log('socket connect ne', socket);
export default socket;
// id // type : int : 1|||2||3
// getAllNotification(): [1,2,3,1,2,31]
// deleteoti(id): 
// Deltetal