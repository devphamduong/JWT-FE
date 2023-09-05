import { useEffect, useState } from 'react';
import './User.scss';
import { fetchAllUsers } from '../../services/userService';

function User(props) {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let response = await fetchAllUsers();
        if (response && response.data && +response.data.EC === 0) {
            setListUser(response.data.DT);
        } else {

        }
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
                    <table classname="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody classname="table-group-divider">
                            {listUser && listUser.length > 0 ?
                                listUser.map((item, index) => {
                                    return (
                                        <tr key={`row-${index}`}>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.username}</td>
                                            <td>{item.Group ? item.Group.name : ''}</td>
                                        </tr>
                                    );
                                })
                                : <><span>Not found users</span></>}
                        </tbody>
                    </table>
                </div>
                <div className="user-footer">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default User;