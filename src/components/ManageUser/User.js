import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './User.scss';
import { deleteUser, fetchAllUsers } from '../../services/userService';
import { toast } from 'react-toastify';
import ModelDelete from './ModalDelete';
import ModalUser from './ModalUser';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';

function User(props) {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(2);
    const [totalPage, setTotalPage] = useState(0);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [dataModalDelete, setDataModalDelete] = useState({});
    const [dataModalUser, setDataModalUser] = useState({});
    const [actionModalUser, setActionModalUser] = useState('CREATE');

    const handleCloseModalDelete = () => {
        setDataModalDelete({});
        setIsShowModalDelete(false);
    };

    const handleCloseModalUser = () => {
        setDataModalUser({});
        setIsShowModalUser(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let res = await fetchAllUsers(currentPage, currentLimit);
        if (res && res.data && +res.data.EC === 0) {
            setTotalPage(res.data.DT.totalPage);
            setListUser(res.data.DT.users);
        } else {

        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = async (user) => {
        setDataModalDelete(user);
        setIsShowModalDelete(true);
    };

    const handleEditUser = async (user) => {
        setActionModalUser("UPDATE");
        setDataModalUser(user);
        setIsShowModalUser(true);
    };

    const confirmDeleteUser = async () => {
        let res = await deleteUser(dataModalDelete.id);
        if (res && res.data && +res.data.EC === 0) {
            toast.success(res.data.EM);
            setIsShowModalDelete(false);
        } else {
            toast.error(res.data.EM);
        }
        await fetchUsers();
    };

    const handleRefresh = async () => {
        await fetchUsers();
    };

    return (
        <>
            <div className='container'>
                <div className='manage-user-container'>
                    <div className="user-header">
                        <div className="title">
                            <h3>Manage user</h3>
                        </div>
                        <div className="actions">
                            <button className='btn btn-success' onClick={() => handleRefresh()}>Refresh</button>
                            <button className='btn btn-primary' onClick={() => { setIsShowModalUser(true); setActionModalUser("CREATE"); }}>Add new</button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {listUser && listUser.length > 0 ?
                                    listUser.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button className="btn btn-warning" onClick={() => handleEditUser(item)}><BiEdit /></button>
                                                    <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}><BsFillTrash3Fill /></button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    : <tr><td colSpan="5" className='text-center'>Not found users</td></tr>}
                            </tbody>
                        </table>
                    </div>
                    {totalPage > 0 &&
                        <div className="user-footer d-flex justify-content-center">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>
            <ModelDelete show={isShowModalDelete} handleClose={handleCloseModalDelete} confirmDeleteUser={confirmDeleteUser} dataModalDelete={dataModalDelete} />
            <ModalUser show={isShowModalUser} handleClose={handleCloseModalUser} action={actionModalUser} dataModal={dataModalUser} fetchUsers={fetchUsers} />
        </>
    );
}

export default User;