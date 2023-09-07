import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { fetchAllGroups } from '../../services/userService';

function ModalUser(props) {
    const initialFormInputs = {
        email: '',
        username: '',
        phone: '',
        password: '',
        sex: '',
        address: '',
        groupID: ''
    };
    const [listGroups, setListGroups] = useState([]);
    const [formData, setFormData] = useState(initialFormInputs);

    const handleChangeInputs = (key, value) => {
        setFormData({
            ...formData, [key]: value,
        });
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        let response = await fetchAllGroups();
        if (response && response.data && +response.data.EC === 0) {
            setListGroups(response.data.DT);
        } else {

        }
    };

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} size='large' centered className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email address (<span className='text-danger'>*</span>)</label>
                            <input type="email" className="form-control" value={formData.email} onChange={(event) => handleChangeInputs('email', event.target.value)} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone (<span className='text-danger'>*</span>)</label>
                            <input type="text" className="form-control" value={formData.phone} onChange={(event) => handleChangeInputs('phone', event.target.value)} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" value={formData.username} onChange={(event) => handleChangeInputs('username', event.target.value)} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Password (<span className='text-danger'>*</span>)</label>
                            <input type="password" className="form-control" value={formData.password} onChange={(event) => handleChangeInputs('password', event.target.value)} />
                        </div>
                        <div className="col-12 form-group">
                            <label>Address </label>
                            <input type="text" className="form-control" value={formData.address} onChange={(event) => handleChangeInputs('address', event.target.value)} />
                        </div>
                        <div className="col-12 form-group">
                            <label>Sex </label>
                            <select name="" id="" className="form-select" defaultValue={'Male'}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="col-12 form-group">
                            <label>Group (<span className='text-danger'>*</span>)</label>
                            <select name="" id="" className="form-select">
                                {listGroups && listGroups.length > 0 &&
                                    listGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.confirmDeleteUser}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;