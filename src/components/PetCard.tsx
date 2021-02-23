import React, { useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';
import { userSelector } from '../store/user/userSlice';
import { petsSelector } from '../store/pets/petsSlice';
import { setModal, setModalMessage } from '../store/modal/modalSlice';

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
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { filter } = useSelector(petsSelector);
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
    dispatch(setModal(true));
    dispatch(setModalMessage('Order placed!'));
    setTimeout(() => {
      dispatch(setModal(false));
      dispatch(setModalMessage(''));
    }, 1500);
  };

  function handleMinusClick() {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }

  function handlePlusClick() {
    setQuantity(quantity + 1);
  }

  function cardMouseOver() {
    setShow(true);
  }

  function cardMouseLeave() {
    setShow(false);
  }

  return (

    <Grid item xs={3} className={classes.gridSpacing}>
      <Card
        className={classes.card}
        onMouseOver={cardMouseOver}
        onMouseLeave={cardMouseLeave}
      >
        <CardActionArea className={classes.cardActionArea}>
          {animal.photoUrls.length >= 1 ? (
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
          {show && user && !(filter !== 'available') && (
            <>
              <RemoveIcon
                className={classes.buttonsOrder}
                onClick={handleMinusClick}
              />
              <Typography className={classes.quantityText}>{quantity}</Typography>
              <AddIcon className={classes.buttonsOrder} onClick={handlePlusClick} />
              <Button onClick={() => handleOrderClick()}>Order</Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>

  );
};

export default PetCard;
