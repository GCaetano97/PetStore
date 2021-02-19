import React, { useState, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Context } from './context';
import Spinner from './Spinner';

interface stateType {
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

const useStyles = makeStyles(() => createStyles({
  gridSpacing: {
    marginBottom: '10px',
  },
  card: {
    maxWidth: '345px',
    '&:hover': {
      cursor: 'default',
    },
  },
  cardActionArea: {
    minHeight: '35vh',
    '&:hover': {
      cursor: 'default',
    },
  },
  cardMedia: {
    height: '140px',
    '&:hover': {
      cursor: 'default',
    },
  },
  buttonsOrder: {
    border: 'solid 0.5px black',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  quantityText: {
    '&:hover': {
      cursor: 'default',
    },
  },
}));

const PetCard = ({ animal }: {animal: petObject}) => {
  const classes = useStyles();
  const state = (useContext(Context) as unknown) as stateType;
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleOrderClick = async () => {
    const myDate = new Date();
    const newDate = new Date(myDate);
    newDate.setHours(newDate.getHours() + 1);
    const orderObject = {
      id: 0,
      petId: animal.id,
      quantity,
      shipDate: newDate,
      status: 'placed',
      complete: true,
    };
    await axios.post(
      'https://petstore.swagger.io/v2/store/order',
      orderObject,
    );
    state.update({
      ...state.state,
      modal: true,
      modalMessage: 'Order placed ! ',
    });
    setTimeout(() => {
      state.update({ ...state.state, modal: false, modalMessage: '' });
    }, 1500);
  };

  return (

    <Grid item xs={3} className={classes.gridSpacing}>
      <Card
        className={classes.card}
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <CardActionArea className={classes.cardActionArea}>
          {animal.photoUrls[0] ? (
            <CardMedia
              className={classes.cardMedia}
              image={animal.photoUrls[0].toString()}
              title={animal.name}
            />
          ) : (
            <Spinner />
          )}
          <CardContent>
            <Typography>{animal.name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {show && state.state.user && !(state.state.filter !== 'available') && (
            <>
              <RemoveIcon
                className={classes.buttonsOrder}
                onClick={() => {
                  if (quantity === 1) {
                    return;
                  }
                  setQuantity(quantity - 1);
                }}
              />
              <Typography className={classes.quantityText}>{quantity}</Typography>
              <AddIcon className={classes.buttonsOrder} onClick={() => setQuantity(quantity + 1)} />
              <Button onClick={() => handleOrderClick()}>Order</Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>

  );
};

export default PetCard;
