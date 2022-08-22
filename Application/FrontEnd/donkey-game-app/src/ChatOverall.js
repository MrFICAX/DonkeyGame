import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Chat from './chat/Chat';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';

const ChatOverall = (props) => {
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [isDisabled, setDisabled] = useState(false);
    const [chatName, setChatName] = useState(props.gameCode);

    useEffect(() => {

        startChat();

        return () => {
            this.closeConnection()
        }
    }, [])

    const joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7225/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                setMessages(messages => [...messages, { user, message }]);
            });

            connection.on("UsersInRoom", (users) => {
                setUsers(users);
            });

            connection.on("newGame", (game) => {
                console.log(game);
                const array = localStorage.games;
                const parsedArray = array ? JSON.parse(array) : [];
                console.log(parsedArray);
                const newArray = [...parsedArray, game];
                console.log(newArray);
                localStorage.games = JSON.stringify(newArray);
                window.dispatchEvent(new Event("storage"));
            })

            connection.onclose(e => {
                setConnection();
                setMessages([]);
                setUsers([]);
            });

            await connection.start();
            await connection.invoke("JoinRoom", { user, room });
            setConnection(connection);
            setDisabled(true);

        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

    function startChat() {
        
        var user = localStorage.username
        var room = chatName
        joinRoom(user, room)
    }

    return <div className='app'>
        <h1>MyChat</h1>
        {/* <Button disabled={isDisabled} color="primary" variant="contained" className='welcomeButton' onClick={startChat}>
            START CHAT
        </Button> */}
        <hr className='line' />
        {connection
            ? <Chat sendMessage={sendMessage} messages={messages} users={users} closeConnection={closeConnection} />
            : <div></div>
        }
    </div>
}

export default ChatOverall;
