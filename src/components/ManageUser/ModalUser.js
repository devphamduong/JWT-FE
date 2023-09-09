import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { createUser, fetchAllGroups } from '../../services/userService';
import { toast } from 'react-toastify';

function ModalUser(props) {
    const { action, dataModal, handleClose, show, fetchUsers } = props;
    const initialUserData = {
        email: '',
        username: '',
        phone: '',
        password: '',
        sex: '',
        address: '',
        group: ''
    };
    const defaultValidInputs = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidUsername: true,
        isValidAddress: true,
        isValidSex: true,
        isValidGroup: true,
    };
    const [listGroups, setListGroups] = useState([]);
    const [userData, setUserData] = useState(initialUserData);
    const [checkInputs, setCheckInputs] = useState(defaultValidInputs);

    const handleChangeInputs = (key, value) => {
        setUserData({
            ...userData, [key]: value,
        });
    };

    const isValidInputs = () => {
        const { email, phone, password, username, sex, address, group } = userData;
        const newCheckInputs = { ...defaultValidInputs };

        const requiredFields = ['email', 'phone', 'password', 'username', 'sex', 'address', 'group'];

        for (const field of requiredFields) {
            if (!userData[field]) {
                newCheckInputs[`isValid${field.charAt(0).toUpperCase() + field.slice(1)}`] = false;
            }
        }

        if (!email || !phone || !password || !username || !sex || !address || !group) {
            toast.error("All fields are required");
            setCheckInputs(newCheckInputs);
            return false;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            newCheckInputs.isValidEmail = false;
            setCheckInputs(newCheckInputs);
            return false;
        }

        setCheckInputs(newCheckInputs);
        return true;
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModal, group: dataModal.Group ? dataModal.Group.id : '' });
        }
    }, [dataModal]);

    useEffect(() => {
        if (action === 'CREATE') {
            if (listGroups && listGroups.length > 0) {
                setUserData({ ...userData, group: listGroups[0].id });
            }
        }
    }, [action]);

    const fetchGroups = async () => {
        let res = await fetchAllGroups();
        if (res && res.data && +res.data.EC === 0) {
            setListGroups(res.data.DT);
            if (res.data.DT && res.data.DT.length > 0) {
                let groups = res.data.DT;
                setUserData({ ...userData, group: groups[0].id });
            }
        } else {

        }
    };

    const handleCreateUser = async () => {
        let isValid = isValidInputs();
        if (isValid) {
            let res = await createUser(userData);
            if (res && res.data && +res.data.EC === 0) {
                toast.success(res.data.EM);
                setUserData({ ...initialUserData, group: listGroups[0].id });
                handleClose();
                await fetchUsers();
            } else {
                const newCheckInputs = { ...defaultValidInputs };
                newCheckInputs[`isValid${res.data.DT.charAt(0).toUpperCase() + res.data.DT.slice(1)}`] = false;
                setCheckInputs(newCheckInputs);
                toast.error(res.data.EM);
            }
        }
    };

    const handleCloseModalUser = () => {
        handleClose();
        setUserData({ ...initialUserData, group: listGroups[0].id });
        setCheckInputs(defaultValidInputs);
    };

    return (
        <>
            <Modal show={show} onHide={() => handleCloseModalUser()} size='lg' centered className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title>{action === 'CREATE' ? 'Create new user' : 'Edit user'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email address (<span className='text-danger'>*</span>)</label>
                            <input type="email" className={checkInputs.isValidEmail ? 'form-control' : 'form-control is-invalid'} value={userData.email} onChange={(event) => handleChangeInputs('email', event.target.value)} disabled={action === "UPDATE"} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone (<span className='text-danger'>*</span>)</label>
                            <input type="text" className={checkInputs.isValidPhone ? 'form-control' : 'form-control is-invalid'} value={userData.phone} onChange={(event) => handleChangeInputs('phone', event.target.value)} disabled={action === "UPDATE"} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Username</label>
                            <input type="text" className={checkInputs.isValidUsername ? 'form-control' : 'form-control is-invalid'} value={userData.username} onChange={(event) => handleChangeInputs('username', event.target.value)} />
                        </div>
                        {action === 'CREATE' ?
                            <div className="col-12 col-sm-6 form-group">
                                <label>Password (<span className='text-danger'>*</span>)</label>
                                <input type="password" className={checkInputs.isValidPassword ? 'form-control' : 'form-control is-invalid'} value={userData.password} onChange={(event) => handleChangeInputs('password', event.target.value)} />
                            </div> : <></>}
                        <div className={action === "CREATE" ? "col-12 form-group" : "col-12 col-sm-6 form-group"}>
                            <label>Address </label>
                            <input type="text" className={checkInputs.isValidAddress ? 'form-control' : 'form-control is-invalid'} value={userData.address} onChange={(event) => handleChangeInputs('address', event.target.value)} />
                        </div>
                        <div className="col-12 form-group">
                            <label>Sex </label>
                            <select className={checkInputs.isValidSex ? 'form-select' : 'form-select is-invalid'} onChange={(event) => handleChangeInputs('sex', event.target.value)} value={userData.sex}>
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="col-12 form-group">
                            <label>Group (<span className='text-danger'>*</span>)</label>
                            <select className={checkInputs.isValidGroup ? 'form-select' : 'form-select is-invalid'} onChange={(event) => handleChangeInputs('group', event.target.value)} value={userData.group}>
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
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateUser()}>
                        {action === 'CREATE' ? "Create" : "Save changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;