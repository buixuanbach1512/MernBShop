import { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories, resetState } from '../../features/category/categorySlice';
import { BiEdit } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import moment from 'moment';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Danh mục',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'updatedAt',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Categories = () => {
    const [open, setOpen] = useState(false);
    const [catId, setCatId] = useState(null);
    const [catName, setCatName] = useState('');
    const dispatch = useDispatch();
    const categoriesState = useSelector((state) => state.category.categories);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const showModal = (id) => {
        setOpen(true);
        setCatId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const data1 = [];
    for (let i = 0; i < categoriesState.length; i++) {
        data1.push({
            key: i + 1,
            name: categoriesState[i].name,
            createdAt: moment(categoriesState[i].createdAt).format('DD/MM/YYYY'),
            updatedAt: moment(categoriesState[i].updatedAt).format('DD/MM/YYYY'),
            children:
                categoriesState[i].children.length !== 0
                    ? categoriesState[i].children.map((i) => {
                          return {
                              name: i.name,
                              createdAt: moment(i.createdAt).format('DD/MM/YYYY'),
                              updatedAt: moment(i.updatedAt).format('DD/MM/YYYY'),
                              action: (
                                  <div className="d-flex gap-10 align-items-center">
                                      <Link className="text-warning mb-0" to={`/admin/editCategory/${i._id}`}>
                                          <BiEdit className="icon-action" />
                                      </Link>
                                      <button
                                          className=" fs-5 text-danger bg-transparent border-0"
                                          onClick={() => showModal(i._id)}
                                      >
                                          <FiDelete className="icon-action" />
                                      </button>
                                  </div>
                              ),
                          };
                      })
                    : '',
            action: (
                <div className="d-flex gap-10 align-items-center">
                    <Link className="text-warning mb-0" to={`/admin/editCategory/${categoriesState[i]._id}`}>
                        <BiEdit className="icon-action" />
                    </Link>
                    <button
                        className=" fs-5 text-danger bg-transparent border-0"
                        onClick={() => showModal(categoriesState[i]._id)}
                    >
                        <FiDelete className="icon-action" />
                    </button>
                </div>
            ),
        });
    }

    const handleDelCategory = (id) => {
        dispatch(deleteCategory(id));
        setOpen(false);
        setCatId(null);
        setTimeout(() => {
            dispatch(resetState());
            dispatch(getCategories());
        }, 100);
    };

    const handleChange = (e) => {
        setCatName(e.target.value);
    };
    const handleSubmit = () => {
        dispatch(getCategories(catName));
        setCatName('');
    };
    return (
        <div className="content-wrapper bg-white p-4">
            <h3 className="mb-4 border-bottom">Danh mục</h3>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên danh mục"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e) => handleChange(e)}
                        value={catName}
                    />
                    <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                        Tìm kiếm
                    </button>
                </div>
                <Link className="btn btn-success d-flex align-items-center gap-2" to="/admin/addCategory">
                    <MdAdd /> Thêm mới
                </Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <Modal
                    title="Xóa danh mục"
                    open={open}
                    onOk={() => handleDelCategory(catId)}
                    onCancel={hideModal}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <p>Bạn muốn xóa danh mục này?</p>
                </Modal>
            </div>
        </div>
    );
};

export default Categories;
