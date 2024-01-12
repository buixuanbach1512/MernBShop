import { IoMdSend } from 'react-icons/io';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { CiImageOn } from 'react-icons/ci';
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom';

const SellerInbox = ({
    setOpen,
    newMessage,
    setNewMessage,
    sendMessageHandler,
    messages,
    senderId,
    userData,
    scrollRef,
}) => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(`/admin/inbox`);
        setOpen(false);
    };
    return (
        <div className="seller-inbox-wrapper d-flex flex-column justify-content-between">
            <div className="d-flex w-100 justify-content-between align-items-center bg-gray p-2">
                <div className={`d-flex align-items-center gap-10`}>
                    <img
                        src="https://bloganchoi.com/wp-content/uploads/2022/05/hinh-avatar-doi-dep-2022-6-696x696.jpg"
                        alt=""
                        className="avatar-user"
                    />
                    <div>
                        <h1 className="fs-4 mb-0">{userData?.name}</h1>
                    </div>
                </div>
                <div className=" d-flex gap-10">
                    <button className="btn btn-success d-flex align-items-center gap-2" onClick={() => handleBack()}>
                        <RiArrowGoBackFill /> Trở lại
                    </button>
                </div>
            </div>
            <div className=" message-box">
                {messages &&
                    messages.map((item, index) => (
                        <div
                            key={index}
                            className={`w-100 d-flex gap-10 mt-3 ${
                                item.sender === senderId ? 'justify-content-end' : ''
                            } `}
                            ref={scrollRef}
                        >
                            {item.sender !== senderId && (
                                <img
                                    src="https://bloganchoi.com/wp-content/uploads/2022/05/hinh-avatar-doi-dep-2022-6-696x696.jpg"
                                    alt=""
                                    className="avatar-user-message"
                                />
                            )}
                            <div className="">
                                <div
                                    className={`w-max bg-green-yellow text-white p-3 rounded-3 ${
                                        item.sender === senderId ? 'bg-green-yellow' : 'bg-primary'
                                    }`}
                                >
                                    <p className="mb-0">{item.text}</p>
                                </div>
                                <p className="mb-0">{format(item.createdAt)}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="p-4">
                <form
                    onSubmit={sendMessageHandler}
                    aria-required
                    className=" position-relative d-flex justify-content-between align-items-center"
                >
                    <div className="w-5">
                        <CiImageOn style={{ fontSize: '2.5rem' }} />
                    </div>
                    <div className=" w-95 d-flex align-items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Nhap ..."
                            className="form-control p-3"
                        />
                        <input type="submit" value="Send" className="hide" id="send" />
                        <label htmlFor="send">
                            <IoMdSend
                                className=" position-absolute cursor-poiner"
                                style={{ top: 5, right: 2, fontSize: '2.5rem' }}
                            />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellerInbox;
