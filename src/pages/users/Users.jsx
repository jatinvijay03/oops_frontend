import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../../components/appbar/SearchBar";
import { Table } from "react-bootstrap";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import './users.css'



export default function Users() {
    const prodEndPoint = "http://localhost:8080/oops/api/product";
    const UsersEndPoint = "http://localhost:8080/oops/api/user";

    const [products, setProducts] = useState([]);
    const [searchInput, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const params = useParams();
    const [searchvalue, setSearchValue] = useState(params.query);

    const navigate = useNavigate();

    const getUsers = async () => {
        const response = await fetch(UsersEndPoint);
        const myJson = await response.json();
        setUsers(myJson)
    }
    useEffect(() => { getUsers() }, [])


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
            // const response2 = await fetch(categEndPoint);
            // const myJson2 = await response2.json(); //extract JSON from the http response
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

    const handledelete = (id) => {
        var data = JSON.stringify({
            "id": id
        });

        var config = {
            method: 'delete',
            url: 'http://localhost:8080/oops/api/user/delete',
            headers: {
                'Content-type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });


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
            <h1 style={{ fontSize: "2rem", margin: "1% auto" }}> Users</h1>
            <Button className="userspagebutton" variant="contained" color="success" onClick={() => navigate('/createuser')} style={{ margin: "1% auto 2% auto" }}>
                Add User
            </Button>

            <Table striped bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>

                    {users.map((user, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.number}</td>
                                <td>{user.role}</td>

                                <td>{user.role == "admin" ? (<></>) : (<Button onClick={() => { handledelete(user.id) }} variant="text">
                                    <DeleteIcon className="delete" sx={{ alignSelf: "center" }} />
                                </Button>)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}