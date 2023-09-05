import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './User.scss';
import { fetchAllUsers } from '../../services/userService';

function User(props) {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(2);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit);
        if (response && response.data && +response.data.EC === 0) {
            setTotalPage(response.data.DT.totalPage);
            setListUser(response.data.DT.users);
        } else {

        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    return (
        <div className='container'>
            <div className='manage-user-container'>
                <div className="user-header">
                    <div className="title">
                        <h3>Table user</h3>
                    </div>
                    <div className="actions">
                        <button className='btn btn-success'>Refresh</button>
                        <button className='btn btn-primary'>Add new</button>
                    </div>
                </div>
                <div className="user-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
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
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.username}</td>
                                            <td>{item.Group ? item.Group.name : ''}</td>
                                            <td>
                                                <button className="btn btn-warning">Edit</button>
                                                <button className='btn btn-danger'>Delete</button>
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
    );
}

export default User;