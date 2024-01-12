import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { deleteBlog, getAllBlog, resetState } from '../../../features/blog/blogSlice';
import handlePermission from '../../../utils/permissionService';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Mô tả tiêu đề',
        dataIndex: 'subTitle',
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
    },
    {
        title: 'Mô tả bài viết',
        dataIndex: 'description',
    },
    {
        title: 'Đăng ngày',
        dataIndex: 'createdAt',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const Blogs = () => {
    const permissions = handlePermission();
    const [open, setOpen] = useState(false);
    const [blogId, setBlogId] = useState(null);
    const [blogTitle, setBlogTitle] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allBlogState = useSelector((state) => state.blog.blogs);
    useEffect(() => {
        dispatch(getAllBlog());
    }, [dispatch]);

    const showModal = (id) => {
        setOpen(true);
        setBlogId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1 = [];
    for (let i = 0; i < allBlogState.length; i++) {
        data1.push({
            key: i + 1,
            title: allBlogState[i].title,
            subTitle: allBlogState[i].subTitle,
            image: <img src={allBlogState[i].images[0]?.url} alt="" width={100} height={100} />,
            description: allBlogState[i].description,
            createdAt: moment(allBlogState[i].createdAt).format('DD/MM/YYYY'),
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <button
                        className="text-warning border-0 bg-transparent"
                        onClick={() => handleEdit(allBlogState[i])}
                    >
                        <BiEdit className="icon-action" />
                    </button>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(allBlogState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleEdit = (data) => {
        const dataBlog = {
            id: data._id,
            title: data.title,
            subTitle: data.subTitle,
            description: data.description,
            images: data.images,
        };
        navigate('/admin/editBlog', { state: dataBlog });
    };

    const handleDelBlog = (id) => {
        dispatch(deleteBlog(id));
        setOpen(false);
        setBlogId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getAllBlog());
        }, 100);
    };

    const handleChange = (e) => {
        setBlogTitle(e.target.value);
    };
    const handleSubmit = () => {
        dispatch(getAllBlog(blogTitle));
        setBlogTitle('');
    };
    return permissions.indexOf('blogs') !== -1 ? (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Bài viết</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên bài viết"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e) => handleChange(e)}
                        value={blogTitle}
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                        Tìm kiếm
                    </button>
                </div>
                <Link className="btn btn-success d-flex align-items-center gap-2" to="/admin/addBlog">
                    <MdAdd /> Thêm mới
                </Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa bài viết"
                    open={open}
                    onOk={() => handleDelBlog(blogId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa bài viết này?</p>
                </Modal>
            </div>
        </div>
    ) : (
        <>Không có quyền hạn</>
    );
};

export default Blogs;
