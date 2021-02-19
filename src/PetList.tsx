import React, { useContext, useEffect } from 'react';
import useSWR from 'swr';
import { Grid } from '@material-ui/core';
import fetcher from './fetcher';
import PetCard from './PetCard';
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

const PetList = () => {
  const state = (useContext(Context) as unknown) as stateType;
  const { data, error } = useSWR<petObject[]>(
    `https://petstore.swagger.io/v2/pet/findByStatus?status=${state.state.filter}`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      if (data.length > 32) {
        data.length = 32;
      }
      data.map(
        (entry: petObject) => {
          // eslint-disable-next-line no-param-reassign
          entry.fakeId = Math.floor(Math.random() * 10000000);
          return entry;
        },
      );
      state.update({ ...state.state, pets: data });
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;

  return (
    <Grid container direction="row">
      {data.map((animal: petObject) => (
        <React.Fragment
          key={animal.fakeId ? animal.fakeId.toString() : Math.floor(Math.random() * 10000000)}
        >
          <PetCard animal={animal} />
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default PetList;
