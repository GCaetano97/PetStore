import React from 'react';
import useSWR from 'swr';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import fetcher from '../fetcher';
import PetCard from './PetCard';
import Spinner from './Spinner';
import { IPet, IState } from '../types';

const PetList: React.FC = () => {
  const filter = useSelector((state: IState) => state.petReducer.filter);
  const { data, error } = useSWR<IPet[]>(
    `https://petstore.swagger.io/v2/pet/findByStatus?status=${filter}`,
    fetcher,
  );

  // slice swr

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;

  return (
    <Grid container direction="row">
      {data.map((animal: IPet) => (
        <React.Fragment
          key={animal.id}
        >
          <PetCard animal={animal} />
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default React.memo(PetList);
