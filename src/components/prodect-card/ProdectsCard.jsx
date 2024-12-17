import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Autocomplete } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../Slices/cart/cartSlice";

const ProductsCard = () => {
  const [filterCategories, setFilterCategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const [isLoad, setLoad] = useState(true);
  const [categoryArr, setCategory] = useState([]);

  const dispatch = useDispatch();

  const filterProducts = (categoryProduct) => {
    const filterCategory = Products.filter(
      (item) => item.category === categoryProduct.value
    );
    setFilterCategories(filterCategory);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");

        const FilterData = data.filter(
          (product) => product.title !== "New Product"
        );

        const categoryArr = FilterData.map((item) => ({
          label: item.category,
          value: item.category,
        }));

        const uniqueArr = categoryArr.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.value === item.value)
        );

        setCategory(uniqueArr);
        setProducts(FilterData);
        setFilterCategories(FilterData);
        setLoad(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        overflowX: "hidden",
        width: "100%",
        padding: "0 16px",
      }}
    >
      <Box className="mt-5">
      <Autocomplete
      disablePortal
      options={categoryArr}
      sx={{ width: 300 }}
      onChange={(e, newValue) => {
      if (newValue) {  
      filterProducts(newValue);
      } else {
      setFilterCategories(Products);
     }
  }}
  renderInput={(params) => <TextField {...params} label="Category" />}
/>
      </Box>
      {isLoad ? (
        <Box className="my-5 w-100 text-center">
          <CircularProgress size="3rem" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filterCategories.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3} 
              key={product.id}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  maxWidth: 300,
                  width: "100%",
                  padding: 3,
                  margin: "15px 0px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <Swiper
                  spaceBetween={10}
                  centeredSlides={true}
                  autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={false}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {[...Array(4)].map((_, index) => (
                    <SwiperSlide key={index}>
                      <img
                        style={{
                          height: "200px",
                          width: "100%",
                          objectFit: "contain",
                        }}
                        src={product?.image}
                        alt={product.title}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Box className="text-start">
                  <Typography variant="body2" className="mt-2 text-start">
                    {product.category}
                  </Typography>
                  <Tooltip title={product.title} placement="top">
                    <Typography variant="h6" className="mt-2 text-start">
                      {product.title.length > 15
                        ? `${product.title.slice(0, 15)}...`
                        : product.title}
                    </Typography>
                  </Tooltip>
                  <Rating
                    name="read-only"
                    value={Math.round(product.rating.rate) || 0}
                    readOnly
                  />
                  <Box className="d-flex justify-content-between align-items-center">
                    <Typography variant="h6">${product.price}</Typography>
                    <Box>
                      <Tooltip title="View Details" placement="top">
                        <Link to={`/product-details/${product.id}`}>
                          <Button>
                            <VisibilityIcon />
                          </Button>
                        </Link>
                      </Tooltip>

                      <Button className="my-2" variant="contained" onClick={() => dispatch(addToCart(product))}>

                        <AddIcon /> Add 
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default ProductsCard;
