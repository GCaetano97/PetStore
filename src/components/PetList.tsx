import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import fetcher from '../fetcher';
import PetCard from './PetCard';
import Spinner from './Spinner';
import { petsSelector, setPets } from '../store/pets/petsSlice';

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

const PetList = () => {
  const dispatch = useDispatch();
  const { pets } = useSelector(petsSelector);
  const { filter } = useSelector(petsSelector);
  const { data, error } = useSWR<petObject[]>(
    `https://petstore.swagger.io/v2/pet/findByStatus?status=${filter}`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      if (data.length > 32) {
        data.length = 32;
      }
      dispatch(setPets(data));
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;

  return (
    <Grid container direction="row">
      {pets.map((animal: petObject, index: number) => (
        <React.Fragment
          // eslint-disable-next-line react/no-array-index-key
          key={`${animal.name}+${index}`}
        >
          <PetCard animal={animal} />
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default PetList;
