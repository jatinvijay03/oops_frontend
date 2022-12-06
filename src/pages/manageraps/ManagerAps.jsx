import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../../components/appbar/SearchBar";
import { ListGroup, Badge, Card } from "react-bootstrap";
import { Button } from "@mui/material";
import './manageraps.css';

export default function ManagerAps() {
    const prodEndPoint = "http://localhost:8080/oops/api/product";
    const managerEndPoint = "http://localhost:8080/oops/api/requestm";
    const [products, setProducts] = useState([]);
    const [searchInput, setSearch] = useState("");
    const [managers, setManagers] = useState([]);




    const params = useParams();
    const [searchvalue, setSearchValue] = useState(params.query);

    const navigate = useNavigate();


    const getManagers = async () => {
        const response = await fetch(managerEndPoint);
        const myJson = await response.json();
        setManagers(myJson)
    }

    useEffect(() => { getManagers() }, []);


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



    useEffect(() => {
        getCategs();
    }, [searchvalue]);


    return (
        <div className="managerpage">
            <SearchBar
                searchvalue={searchInput}
                searchfunction={handleSearchInput}
                searchbuttonfunction={handleSearchButtonClick}

            />
            <h1 style={{ fontSize: "2rem", margin: "5% auto" }}> Manager Applications</h1>
            <Card className="managercard">
                <ListGroup as="ol" numbered style={{}}>

                    {managers.map((manager, index) => {
                        return (
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start managerslist"
                                style={{ width: "30rem", margin: "0% auto" }}
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{manager.name}</div>
                                    {manager.email}
                                </div>
                                <Button variant="contained" className="managerbutton">
                                    Approve Manager
                                </Button>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Card>
        </div>
    )
}