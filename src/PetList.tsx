import React from "react";
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

const PetList = ({ data }) => {
  console.log(Date());
  return (
    <Grid container direction="row">
      {data.map(
        (animal: {
          id: string | number | null | undefined;
          photoUrls: string | undefined;
          name: {} | null | undefined;
        }) => {
          return (
            <Grid item key={animal.id} xs={3} style={{ marginBottom: "10px" }}>
              <Card style={{ maxWidth: "345px" }}>
                <CardActionArea>
                  <CardMedia
                    style={{ height: "140px" }}
                    image={animal.photoUrls}
                    title={animal.name}
                  />
                  <CardContent>
                    <Typography>{animal.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default PetList;
