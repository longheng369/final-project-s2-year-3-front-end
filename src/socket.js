// socket.js

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import dotenv from "dotenv"
dotenv.config()

const setupWebSocket = () => {
    window.Pusher = Pusher;
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.REACT_APP_PUSHER_APP_KEY,
        cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
        encrypted: true,
    });
};

export default setupWebSocket;
