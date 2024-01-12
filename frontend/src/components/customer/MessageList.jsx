import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;
let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };

const MessageList = ({ item, setOpen, setCurrentChat, senderId, setUserData, online, setConversationId }) => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/inbox-shop?${id}`);
        setOpen(true);
        setConversationId(id);
    };
    useEffect(() => {
        const userId = item.members.find((user) => user != senderId);
        const getAUser = async () => {
            try {
                const response = await axios.get(`user/get-user/${userId}`);
                setUser(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        getAUser();
    }, [item, senderId]);
    return (
        <div
            className={`message-user w-100 d-flex align-items-center gap-10 p-1 my-4 cursor-poiner`}
            onClick={() => handleClick(item._id) || setCurrentChat(item) || setUserData(item.groupName)}
        >
            <div className=" info-user">
                <img
                    src="https://bloganchoi.com/wp-content/uploads/2022/05/hinh-avatar-doi-dep-2022-6-696x696.jpg"
                    alt=""
                    className="avatar-user"
                />
                {online ? <div className="active-icon"></div> : <div className="unActive-icon"></div>}
            </div>
            <div className="">
                <h1 className="fs-5 mb-0">{item.groupName}</h1>
                <p className="mb-0">
                    {item.lastMessageId !== user?._id ? (
                        item.lastMessage ? (
                            `Bạn: ${item.lastMessage}`
                        ) : (
                            'Bắt đầu trò chuyện'
                        )
                    ) : (
                        <p>
                            <strong>{item.lastMessage}</strong>
                        </p>
                    )}
                </p>
            </div>
        </div>
    );
};

export default MessageList;
