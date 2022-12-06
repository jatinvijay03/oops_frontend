import SearchBar from "../../components/appbar/SearchBar"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";




export default function Profile() {

    const [products, setProducts] = useState([]);
    const [searchInput, setSearch] = useState("");
    const prodEndPoint = "http://localhost:8080/oops/api/product";
    const userEndPoint = "http://localhost:8080/oops/api/user/";
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(false);
    const [currentpassword, setCurrentPassword] = useState("")
    const [newpassword, setnewPassword] = useState("")
    const [confirm, setConfirm] = useState("")




    const handleClose = () => {
        console.log(currentpassword);
        console.log(newpassword);
        console.log(confirm);
        setShow(false)
    };
    const handleShow = () => setShow(true);


    const params = useParams();
    const [searchvalue, setSearchValue] = useState(params.query);

    const navigate = useNavigate();

    const getUser = async () => {
        const response = await fetch(userEndPoint + localStorage.getItem('uid'));
        const myJson = await response.json();
        setUser(myJson);

    }

    useEffect(() => { getUser() }, []);

    const getCategs = async () => {

        if (searchvalue.includes("category=")) {
            var a = searchvalue.indexOf("=");
            const response = await fetch(prodEndPoint + "/category=" + searchvalue.substring(a + 1));
            const myJson = await response.json();
            setProducts(myJson)
        }
        else {
            const response = await fetch(prodEndPoint + "/q=" + searchvalue);
            const myJson = await response.json();
            setProducts(myJson)
        }
    }

    const handleSearchInput = (event) => {
        setSearch(event.target.value);

    }

    const handleSearchButtonClick = (event) => {
        setSearchValue(searchInput)

        navigate('/products/' + (searchInput));
    }

    const handleCP = (event) => {
        setCurrentPassword(event.target.value);
    }
    const handleNew = (event) => {
        setnewPassword(event.target.value);
    }
    const handleConfirm = (event) => {
        setConfirm(event.target.value);
    }



    useEffect(() => {
        getCategs();
    }, [searchvalue]);
    return (
        <div>
            <SearchBar
                searchvalue={searchInput}
                searchfunction={handleSearchInput}
                searchbuttonfunction={handleSearchButtonClick}

            />
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack>
                        <Form.Label htmlFor="inputPassword5">Current Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={currentpassword}
                            onChange={handleCP}
                        /><Form.Label htmlFor="inputPassword5">New Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={newpassword}
                            onChange={handleNew}
                        /><Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={confirm}
                            onChange={handleConfirm}
                        />

                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">Your Profile</h2>

                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email Id</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.email}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.address}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.number}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" >
                            <dt className="text-sm font-medium text-gray-500">Reset Password</dt>
                            <dd className="text-sm font-medium text-gray-500" >
                                <Button variant="contained" color="success" onClick={handleShow}>Reset</Button>
                            </dd>

                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Delete Account</dt>
                            <dd className="text-sm font-medium text-gray-500">
                                <Button variant="contained" color="error">Delete</Button>
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Apply for manager</dt>
                            <dd className="text-sm font-medium text-gray-500">
                                <Button variant="contained" color="success">Apply</Button>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}