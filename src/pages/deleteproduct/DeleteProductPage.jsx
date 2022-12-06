import { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import SearchBar from "../../components/appbar/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import "./deleteProductPage.css";
import CartItem from "../../components/cartitem/CartItem";
import axios from "axios";

export default function DeleteProductPage() {

    const [products, setProducts] = useState([]);
    const [searchInput, setSearch] = useState("");
    const [prods, setProds] = useState([]);


    const prodEndPoint = "http://localhost:8080/oops/api/product";


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

    const params = useParams();
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
        const response = await fetch(prodEndPoint);
        const myJson = await response.json();
        setProds(myJson);
    }
    useEffect(() => { getOrders(); }, []);

    const handleDelete = (id)=>{
        var data = JSON.stringify({
            "id": id
          });
          
          var config = {
            method: 'delete',
            url: 'http://localhost:8080/oops/api/product/delete',
            headers: { 
              'Content-type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

        window.location.reload();
    }


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
                <MDBContainer className="py-5 h-100" style={{width:"120rem"}}>
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="10" xl="8">
                            <MDBCard style={{ borderRadius: "10px" }}>
                                <MDBCardHeader className="px-4 py-5">
                                    <MDBTypography tag="h1" className="mb-0" style={{ fontSize: "2rem" }}>
                                        All Products
                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBCardBody className="p-4">

                                    {prods.map((product, index) => {
                                        return (<MDBCard className="shadow-0 border mb-4">
                                            <MDBCardBody>
                                                <CartItem
                                                    className="checkoutcartitem"
                                                    key={index}
                                                    image={product.image}
                                                    description={product.description}
                                                    price={product.price}
                                                    name={product.name}
                                                    isDeletable={true}
                                                    isOrder ={false}
                                                    handledelete = {()=>{
                                                        handleDelete(product.id);
                                                    }}
                                                />
                                            </MDBCardBody>
                                        </MDBCard>)

                                    })}
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>



        </div>
    )
}