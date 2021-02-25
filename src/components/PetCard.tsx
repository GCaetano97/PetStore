import React, { useState, useEffect, useRef } from 'react';
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
import { IPet, IState } from '../types';
import { Display, DisplayNone } from '../store/actions/notificationActions';

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

interface AnimalProps {
  animal: IPet,
}

const PetCard: React.FC<AnimalProps> = ({ animal }: AnimalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: IState) => state.userReducer.user);
  const filter = useSelector((state: IState) => state.petReducer.filter);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const timer: React.MutableRefObject<undefined | number> = useRef(undefined);

  useEffect(() => () => {
    clearTimeout(timer.current);
  }, [timer]);

  const handleOrderClick = React.useCallback(async () => {
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
    dispatch(Display('Order placed!'));
    timer.current = window.setTimeout(() => {
      dispatch(DisplayNone());
    }, 1500);
  }, [animal.id, dispatch, quantity]);

  const handleMinusClick = React.useCallback(() => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  }, []);

  const handlePlusClick = React.useCallback(() => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }, []);

  const handleMouseOver = React.useCallback(() => {
    setShow(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setShow(false);
  }, []);

  return (

    <Grid item xs={3} className={classes.gridSpacing}>
      <Card
        className={classes.card}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
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
              {quantity > 1
            && (
            <RemoveIcon
              className={classes.buttonsOrder}
              onClick={handleMinusClick}
            />
            )}
              {quantity <= 1
              && (
                <RemoveIcon
                  className={classes.buttonsOrder}
                />
              )}
              <Typography className={classes.quantityText}>{quantity}</Typography>
              <AddIcon className={classes.buttonsOrder} onClick={handlePlusClick} />
              <Button onClick={handleOrderClick}>Order</Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>

  );
};

export default React.memo(PetCard);
