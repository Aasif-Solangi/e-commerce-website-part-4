import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Button, Rating, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";


const ProductDetails = () => {
  const [Product, setProduct] = useState(null); 
  const [isLoad, setLoad] = useState(true);
  const { product_id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${product_id}`);
        setProduct(data); 
        setLoad(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoad(false);
      }
    };

    fetchProducts();
  }, [product_id]);

  if (isLoad) {
    return <div>Loading...</div>;
  }

  console.log(Product, 'Product');
  
  return (
    <>

      <div className="row mt-5">
        <div className="col-md-4 text-center">
        <img style={{ minHeight: "400px", width: "300px" }} src={Product?.image} alt={Product?.title} />

        </div>
        <div className="col-md-8 mt-5">
          <span>{Product?.category}</span>
          <h2>{Product?.title}</h2>
          <p>{Product?.description}</p>
          <Rating
            name="read-only"
            value={Math.round(Product?.rating?.rate)} 
            readOnly
          />
           <Box className="d-flex justify-content-between align-items-center">
                  <Typography variant="h6">${Product.price}</Typography>
                  <Box>
                    
                    <Button className="my-3" variant="contained">
                      <AddIcon /> Add
                    </Button>
                  </Box>
                </Box>
        </div>
      </div>

     
    </>
  );
};

export default ProductDetails;
