import MessageList from '../../components/customer/MessageList';
import { useEffect, useRef, useState } from 'react';
import SellerInbox from '../../components/customer/SellerInbox';
import socketIO from 'socket.io-client';
import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../components/customer/BreadCrumb';
import Meta from '../../components/customer/Meta';
import { Link } from 'react-router-dom';
axios.defaults.baseURL = baseUrl;
let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
const ENDPOINT = 'http://localhost:5001/';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const InboxShop = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [conversations, setConversations] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [userData, setUserData] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const scrollRef = useRef(null);
    const conversationState = useSelector((state) => state.conversation);

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
        if (conversationState.isSucess && conversationState.deletedConversation) {
            getConversation();
        }
    }, [messages, conversationState]);

    useEffect(() => {
        if (user) {
            const senderId = user?._id;
            socketId.emit('addUser', senderId);
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
    console.log(1);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ beahaviour: 'smooth' });
    }, [messages]);

    return (
        <>
            <Meta title={'Trò chuyện với B-Shop'} />
            <BreadCrumb title={'Trò chuyện với B-Shop'} />
            <div className="inbox-wrapper home-wrapper-2 py-5  ">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-xl-3 col-md-3 col-12">
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">Danh mục</h3>
                                <div>
                                    <ul className="ps-0">
                                        <li>
                                            <Link to={'/'} className="text-dark">
                                                Trang chủ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="text-dark">Blog</Link>
                                        </li>
                                        <li>
                                            <Link className="text-dark">Liên hệ</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-md-9 col-12 ">
                            <div className=" inbox-content bg-white rounded-3">
                                {!open && (
                                    <>
                                        <h1 className="text-center bg-main text-white p-3 rounded-3 ">Đoạn chat</h1>
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
                                                    setConversationId={setConversationId}
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
                                            conversationId={conversationId}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InboxShop;
