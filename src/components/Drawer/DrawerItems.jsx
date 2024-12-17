import { Box, Button, Drawer, Rating, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, deleteProduct, increaseQuantity } from "../Slices/cart/cartSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import RemoveIcon from '@mui/icons-material/Remove';

const DrawerItems = (props) => {
  const { openItems, toggleOpenItems } = props;
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartItems);

  return (
    <>
      <Drawer
        open={openItems}
        onClose={toggleOpenItems(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 370,
          },
        }}
      >
        <Box sx={{ width: "350px" }}>
          <h1>Cart Items</h1>
          {cartItems?.map((item) => {
            return (
              <div className="row my-4 py-4 border border-danger">
                <Box className="col-9 d-flex">
                  <img width={50} src={item?.image} alt="" />
                  <Box className="ms-3 ">
                    <Typography>
                      {item.title.length > 15
                        ? `${item.title.slice(0, 15)}...`
                        : item.title}
                    </Typography>
                    <Typography>{item.category}</Typography>
                    <Rating
                      name="read-only"
                      value={Math.round(item?.rating?.rate)}
                      readOnly
                    />
                    <Typography>{item.price}</Typography>
                    <span>Qty:{item?.quantity}</span>
                  </Box>
                </Box>
                <Box className="col-3 d-flex flex-column">
                  <Button
                    onClick={() => dispatch(decreaseQuantity(item))}
                    size="small"
                    variant="outlined"
                    color="error"
                  >
                 <RemoveIcon/>
                  </Button>
                  <Button className=" my-2"
                    onClick={() => dispatch(increaseQuantity(item))}
                    size="small"
                    variant="outlined"
                    color="success"
                  >
                  <PlusOneIcon/>
                  </Button>
                  <Button
                    onClick={() => dispatch(deleteProduct(item))}
                    size="small"
                    variant="outlined"
                    color="error"
                  >
                   <DeleteIcon/> 
                  </Button>
                </Box>
              </div>
            );
          })}
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerItems;
