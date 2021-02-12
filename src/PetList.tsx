import React, {useContext} from "react";
import fetcher from './fetcher'
import useSWR from 'swr'
import PetCard from './PetCard'
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
import {Context} from '../src/context'

const PetList = () => {
  const state = useContext(Context)
  console.log('this is state', state)
  const {data, error} = useSWR(`https://petstore.swagger.io/v2/pet/findByStatus?status=${state.state.filter}`, fetcher)

  if (error) return <div>failed to load</div>
  if(!data) return <div>loading...</div>

  return (
    <Grid container direction="row">
      {data.map(animal => <PetCard animal={animal} />)}
    </Grid>
  );
};

export default PetList;