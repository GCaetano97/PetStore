import React, { useState, useContext } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { Context } from "./context";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

interface state {
  state: {
    user: boolean;
    username: string;
    filter: string;
    pets: Array<Object>;
    modal: boolean;
    modalMessage: string;
  };
  update: Function;
}

interface petObject {
  id: number;
  category: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls: [string];
  tags: [
    {
      id: number;
      name: string;
    },
  ];
  status: string;
  fakeId: number;
}

const PetCard = ({ animal }) => {
  const state: state = (useContext(Context) as unknown) as state;
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleOrderClick = async () => {
    const myDate = new Date();
    const newDate = new Date(myDate);
    newDate.setHours(newDate.getHours() + 1);
    const orderObject = {
      id: 0,
      petId: animal.id,
      quantity: quantity,
      shipDate: newDate,
      status: "placed",
      complete: true,
    };
    await axios.post(
      "https://petstore.swagger.io/v2/store/order",
      orderObject,
    );
    state.update({
      ...state.state,
      modal: true,
      modalMessage: `Order placed ! `,
    });
    setTimeout(() => {
      state.update({ ...state.state, modal: false, modalMessage: "" });
    }, 1500);
  };
  return (
    <Grid item key={animal.fakeId} xs={3} style={{ marginBottom: "10px" }}>
      <Card
        style={{ maxWidth: "345px" }}
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <CardActionArea>
          <CardMedia
            style={{ height: "140px" }}
            image={
              animal.photoUrls === "string"
                ? animal.photoUrls
                : "data:image/jpeg;base64,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"
            }
            title={animal.name}
          />
          <CardContent>
            <Typography>{animal.name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {show && state.state.user && !(state.state.filter !== "available") && (
            <React.Fragment>
              <RemoveIcon
                onClick={() => {
                  if (quantity === 1) {
                    return;
                  }
                  setQuantity(quantity - 1);
                }}
              />
              {quantity}
              <AddIcon onClick={() => setQuantity(quantity + 1)} />
              <Button onClick={() => handleOrderClick()}>Order</Button>
            </React.Fragment>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PetCard;
