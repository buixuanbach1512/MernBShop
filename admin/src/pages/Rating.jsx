import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRating, getProducts, resetState } from '../features/product/productSlice';
import { FiDelete } from 'react-icons/fi';
import moment from 'moment';

const columns = [
    {
        title: 'Tên sản phẩm',
        dataIndex: 'product',
    },
    {
        title: 'Khách hàng',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Nội dung đánh giá',
        dataIndex: 'comment',
        width: '30%',
    },
    {
        title: 'Số sao',
        dataIndex: 'star',
    },
    {
        title: 'Thời gian',
        dataIndex: 'date',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const Rating = () => {
    const getUserFromSessionStorage = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null;
    const permissions = getUserFromSessionStorage.permissions;

    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [prodId, setProdId] = useState(null);
    const dispatch = useDispatch();
    const allProductState = useSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const showModal = (a, b) => {
        setOpen(true);
        setProdId(a);
        setUserId(b);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const handleDelRate = () => {
        console.log('user id', userId);
        console.log('prod id', prodId);
        const data = {
            id: userId,
            prodId: prodId,
        };
        dispatch(deleteRating(data));
        setOpen(false);
        setUserId(null);
        setProdId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getProducts());
        }, 100);
    };

    const data1 = [];
    for (let i = 0; i < allProductState.length; i++) {
        for (let j = 0; j < allProductState[i].ratings.length; j++) {
            const element = allProductState[i].ratings[j];
            data1.push({
                product: allProductState[i].name,
                name: element?.postedBy?.name,
                comment: element.comment,
                star: element.star,
                date: moment(element.date).format('hh:mm:ss DD/MM/YYYY'),
                action: (
                    <div className="d-flex gap-10 align-items-center">
                        <button
                            className=" fs-5 text-danger bg-transparent border-0"
                            onClick={() => showModal(allProductState[i]._id, element.postedBy._id)}
                        >
                            <FiDelete className="icon-action" />
                        </button>
                    </div>
                ),
            });
        }
    }

    return permissions.indexOf('contact') !== -1 ? (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Đánh giá sản phẩm</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên khách hàng"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2">
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa đánh giá"
                    open={open}
                    onOk={() => handleDelRate()}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa đánh giá này?</p>
                </Modal>
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Rating;
