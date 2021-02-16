import React, { useContext, useEffect } from "react";
import fetcher from "./fetcher";
import useSWR from "swr";
import PetCard from "./PetCard";
import { Grid } from "@material-ui/core";
import { Context } from "../src/context";

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

const PetList = () => {
  const state: state = (useContext(Context) as unknown) as state;
  const { data, error } = useSWR(
    `https://petstore.swagger.io/v2/pet/findByStatus?status=${state.state.filter}`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      if (data.length > 32) {
        data.length = 32;
      }
      data.map(
        (entry: petObject) =>
          (entry.fakeId = Math.floor(Math.random() * 10000000)),
      );
      state.update({ ...state.state, pets: data });
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Grid container direction="row">
      {data.map((animal: petObject) => (
        <PetCard animal={animal} key={animal.fakeId} />
      ))}
    </Grid>
  );
};

export default PetList;
