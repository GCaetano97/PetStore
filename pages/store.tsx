import React, { useState } from "react";
import Header from "../src/Header";
import Typography from "@material-ui/core/Typography";
import Link from "../src/Link";
import {
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import PetList from "../src/PetList";

function Store() {
  const [value, setValue] = useState("available");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const data = [
    {
      id: 1,
      name: "Transcof",
      photoUrls:
        "https://robohash.org/arationerepellendus.jpg?size=100x100&set=set1",
      status: "Agender",
    },
    {
      id: 2,
      name: "Otcom",
      photoUrls: "https://robohash.org/omnisatautem.jpg?size=100x100&set=set1",
      status: "Polygender",
    },
    {
      id: 3,
      name: "Y-Solowarm",
      photoUrls: "https://robohash.org/sequierrorat.png?size=100x100&set=set1",
      status: "Genderqueer",
    },
    {
      id: 4,
      name: "Opela",
      photoUrls: "https://robohash.org/autexpeditaab.png?size=100x100&set=set1",
      status: "Female",
    },
    {
      id: 5,
      name: "Lotstring",
      photoUrls:
        "https://robohash.org/rationedeserunttempore.bmp?size=100x100&set=set1",
      status: "Genderfluid",
    },
    {
      id: 6,
      name: "Konklab",
      photoUrls:
        "https://robohash.org/sequitotamesse.png?size=100x100&set=set1",
      status: "Bigender",
    },
    {
      id: 7,
      name: "Aerified",
      photoUrls: "https://robohash.org/quoutdeserunt.png?size=100x100&set=set1",
      status: "Polygender",
    },
    {
      id: 8,
      name: "Lotlux",
      photoUrls:
        "https://robohash.org/etoditassumenda.jpg?size=100x100&set=set1",
      status: "Male",
    },
    {
      id: 9,
      name: "Konklux",
      photoUrls:
        "https://robohash.org/etassumendaminima.jpg?size=100x100&set=set1",
      status: "Agender",
    },
    {
      id: 10,
      name: "Veribet",
      photoUrls:
        "https://robohash.org/nonnonlaboriosam.jpg?size=100x100&set=set1",
      status: "Agender",
    },
    {
      id: 11,
      name: "Tempsoft",
      photoUrls:
        "https://robohash.org/culpanihilaccusantium.png?size=100x100&set=set1",
      status: "Bigender",
    },
    {
      id: 12,
      name: "Bamity",
      photoUrls:
        "https://robohash.org/etrepudiandaealiquid.png?size=100x100&set=set1",
      status: "Female",
    },
    {
      id: 13,
      name: "Hatity",
      photoUrls:
        "https://robohash.org/doloresconsequunturrecusandae.png?size=100x100&set=set1",
      status: "Female",
    },
    {
      id: 14,
      name: "Konklab",
      photoUrls:
        "https://robohash.org/dolorsapienteadipisci.jpg?size=100x100&set=set1",
      status: "Agender",
    },
    {
      id: 15,
      name: "Tempsoft",
      photoUrls:
        "https://robohash.org/temporadelenitivoluptatum.png?size=100x100&set=set1",
      status: "Genderfluid",
    },
    {
      id: 16,
      name: "Trippledex",
      photoUrls: "https://robohash.org/sitameteos.bmp?size=100x100&set=set1",
      status: "Genderfluid",
    },
    {
      id: 17,
      name: "Cardguard",
      photoUrls:
        "https://robohash.org/architectovoluptatemconsequuntur.jpg?size=100x100&set=set1",
      status: "Polygender",
    },
    {
      id: 18,
      name: "Daltfresh",
      photoUrls:
        "https://robohash.org/autdoloremporro.jpg?size=100x100&set=set1",
      status: "Female",
    },
    {
      id: 19,
      name: "Keylex",
      photoUrls:
        "https://robohash.org/doloresvoluptasvelit.bmp?size=100x100&set=set1",
      status: "Genderqueer",
    },
    {
      id: 20,
      name: "Duobam",
      photoUrls:
        "https://robohash.org/dolorsaepedistinctio.png?size=100x100&set=set1",
      status: "Non-binary",
    },
    {
      id: 21,
      name: "Bitwolf",
      photoUrls:
        "https://robohash.org/voluptateexercitationemnulla.png?size=100x100&set=set1",
      status: "Male",
    },
    {
      id: 22,
      name: "Ventosanzap",
      photoUrls:
        "https://robohash.org/architectoullamomnis.bmp?size=100x100&set=set1",
      status: "Female",
    },
    {
      id: 23,
      name: "Asoka",
      photoUrls: "https://robohash.org/ipsanonearum.bmp?size=100x100&set=set1",
      status: "Genderfluid",
    },
    {
      id: 24,
      name: "Quo Lux",
      photoUrls:
        "https://robohash.org/maximesapientequibusdam.bmp?size=100x100&set=set1",
      status: "Genderqueer",
    },
    {
      id: 25,
      name: "Bigtax",
      photoUrls: "https://robohash.org/autsitnumquam.bmp?size=100x100&set=set1",
      status: "Bigender",
    },
  ];

  return (
    <React.Fragment>
      <Header />
      <Grid container direction="row" style={{ marginTop: "15px" }}>
        <Grid container item direction="column" xs={2}>
          <Paper style={{ minHeight: "15vh", marginLeft: "10px" }}>
            <Typography align="center" style={{ marginTop: "5px" }}>
              Search by availability
            </Typography>
            <div style={{ marginLeft: "15px" }}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="status"
                  name="status1"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="available"
                    control={<Radio />}
                    label="Available"
                  />
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    value="sold"
                    control={<Radio />}
                    label="sold"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Paper>
        </Grid>
        <Grid container item direction='column' xs={9}>
          <PetList data={data} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Store;
