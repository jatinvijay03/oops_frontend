import { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,

    MDBCardHeader,

    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import SearchBar from "../../components/appbar/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import "./orderpage.css";
import CartItem from "../../components/cartitem/CartItem";


export default function ReportsPage() {

    const [products, setProducts] = useState([]);
    const [searchInput, setSearch] = useState("");
    const [order, setOrder] = useState([]);
    const [orderproducts, setOrderProducts] = useState([]);
    const [itemQuantities, setitemQuantities] = useState(0);


    const params = useParams();
    const prodEndPoint = "http://localhost:8080/oops/api/product";
    var orderEndPoint = "http://localhost:8080/oops/api/order/" + params.query;



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
            setProducts(myJson);
        }
    }

    const [searchvalue, setSearchValue] = useState(params.query);

    const navigate = useNavigate();

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

    const getOrders = async () => {

        const response = await fetch(orderEndPoint);
        const myJson = await response.json();

        setOrder(myJson);

        var produ = []
        var quantities = []


        myJson.forEach(async (element) => {
            const response2 = await fetch(prodEndPoint + "/pid=" + element.pid);
            const myJson2 = await response2.json();


            produ.push(myJson2);
            quantities.push(element.quantity);
            setOrderProducts(produ);
            setitemQuantities(quantities);


        });

    }
    useEffect(() => { getOrders(); }, []);



    return (
        <div>
            <SearchBar
                searchvalue={searchInput}
                searchfunction={handleSearchInput}
                searchbuttonfunction={handleSearchButtonClick}
            />
            <section
                className="h-100 gradient-custom"
                style={{ backgroundColor: "#eee" }}
            >
                <MDBContainer className="py-5 h-100" style={{ width: "120rem" }}>
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="10" xl="8">
                            <MDBCard style={{ borderRadius: "10px" }}>
                                <MDBCardHeader className="px-4 py-5">
                                    <MDBTypography tag="h1" className="mb-0" style={{ fontSize: "2rem" }}>
                                        Orders Report

                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBCardBody className="p-4">


                                    {(orderproducts.map((product, index) => {


                                        return (
                                            <MDBCard className="shadow-0 border mb-4" key={index}>
                                                <MDBCardBody key={index}>
                                                    <CartItem

                                                        className="checkoutcartitem"
                                                        image={product.image}
                                                        description={product.description}
                                                        price={product.price}
                                                        name={product.name}
                                                        quantity={itemQuantities[index]}
                                                        isDeletable={false}
                                                        isOrder={true}
                                                        date={order[index].orderDate}
                                                        allproducts={false}
                                                    />

                                                </MDBCardBody>
                                            </MDBCard>)

                                    }))}


                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>



        </div>
    )
}