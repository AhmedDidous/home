import React, {useState, useEffect} from 'react';
import queryString from 'query-string';


const io = require("socket.io-client");

let socket = io("localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const Chat =({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';


    useEffect(() => {
        const{name , room} = queryString.parse(location.search);

        socket = io('localhost:5000');

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => {
         
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);
    
    
    
    return (

        <h1>Chat</h1>
    )

}

export default Chat;