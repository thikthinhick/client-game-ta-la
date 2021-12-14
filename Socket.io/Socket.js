import io from 'socket.io-client';
import {ip} from '../styles/config'
var socket = io(ip);
export default socket;