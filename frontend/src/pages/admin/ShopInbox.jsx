import MessageList from '../../components/admin/MessageList';
import { useEffect, useRef, useState } from 'react';
import SellerInbox from '../../components/admin/SellerInbox';
import socketIO from 'socket.io-client';
import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;
let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
const ENDPOINT = 'http://localhost:5001/';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const ShopInbox = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [conversations, setConversations] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [userData, setUserData] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        socketId.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        const getConversation = async () => {
            try {
                const resonse = await axios.get(`conversation/`, {
                    withCredentials: true,
                });

                setConversations(resonse.data);
            } catch (error) {
                console.log(error);
            }
        };
        getConversation();
    }, [messages]);

    useEffect(() => {
        if (user) {
            const sellerId = user?._id;
            socketId.emit('addUser', sellerId);
            socketId.on('getUsers', (data) => {
                setOnlineUsers(data);
            });
        }
    }, []);

    const onlineCheck = (chat) => {
        const chatMembers = chat.members.find((member) => member !== user?._id);
        const online = onlineUsers.find((user) => user.userId === chatMembers);

        return online ? true : false;
    };

    // get messages
    useEffect(() => {
        const getMessage = async () => {
            try {
                if (currentChat) {
                    const response = await axios.get(`message/get-message-by-id/${currentChat?._id}`);
                    setMessages(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getMessage();
    }, [currentChat]);

    // create new message
    const sendMessageHandler = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find((member) => member !== user._id);

        socketId.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            if (newMessage !== '') {
                await axios
                    .post(`message/create-new-message`, message)
                    .then((res) => {
                        setMessages([...messages, res.data]);
                        updateLastMessage();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateLastMessage = async () => {
        socketId.emit('updateLastMessage', {
            lastMessage: newMessage,
            lastMessageId: user._id,
        });

        await axios
            .put(`conversation/update-last-message/${currentChat._id}`, {
                lastMessage: newMessage,
                lastMessageId: user._id,
            })
            .then((res) => {
                console.log(res.data);
                setNewMessage('');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ beahaviour: 'smooth' });
    }, [messages]);

    return (
        <>
            <div className="content-wrapper bg-white ">
                {!open && (
                    <>
                        <h1 className="text-center bg-primary text-white p-3">Tất cả đoạn chat</h1>
                        {conversations &&
                            conversations.map((item, index) => (
                                <MessageList
                                    item={item}
                                    key={index}
                                    setOpen={setOpen}
                                    setCurrentChat={setCurrentChat}
                                    senderId={user?._id}
                                    axios={axios}
                                    userData={userData}
                                    setUserData={setUserData}
                                    online={onlineCheck(item)}
                                />
                            ))}
                    </>
                )}
                {open && (
                    <>
                        <SellerInbox
                            setOpen={setOpen}
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            sendMessageHandler={sendMessageHandler}
                            messages={messages}
                            senderId={user?._id}
                            userData={userData}
                            scrollRef={scrollRef}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default ShopInbox;
