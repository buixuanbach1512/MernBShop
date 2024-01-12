import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MessageList = ({ item, setOpen, setCurrentChat, senderId, setUserData, online, axios }) => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/admin/inbox?${id}`);
        setOpen(true);
    };
    useEffect(() => {
        const userId = item.members.find((user) => user != senderId);
        const getAUser = async () => {
            try {
                let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
                axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
                const response = await axios.get(`user/get-user/${userId}`);
                setUser(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        getAUser();
    }, [axios, item, senderId]);
    return (
        <div
            className={`message-user w-100 d-flex align-items-center gap-10 p-2 cursor-poiner`}
            onClick={() => handleClick(item._id) || setCurrentChat(item) || setUserData(user)}
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
                <h1 className="fs-5 mb-0">{user?.name}</h1>
                <div className="mb-0">
                    {item.lastMessageId !== user?._id ? (
                        <p>Bạn: {item.lastMessage}</p>
                    ) : (
                        <p>
                            <strong>{item.lastMessage}</strong>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageList;
