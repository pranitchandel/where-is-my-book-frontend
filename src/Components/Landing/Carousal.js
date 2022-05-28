import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
const Carousal = () => {
  var items = [
    {
      name: "Random Name #1",
      imageUrl: "https://d2g9wbak88g7ch.cloudfront.net/bannerimages/77_inr.jpg",
    },
    {
      name: "Random Name #2",
      imageUrl: "https://d2g9wbak88g7ch.cloudfront.net/bannerimages/70_inr.jpg",
    },
    {
      name: "Random Name #3",
      imageUrl: "https://d2g9wbak88g7ch.cloudfront.net/bannerimages/72_inr.jpg",
    },
  ];
  return (
    <Carousel
      indicators={false}
      sx={{ width: "100%", height: 500, marginTop: 10 }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props) {
  return (
    <Paper sx={{ display: "flex" }}>
      <img
        style={{
          margin: "auto",
          width: "100%",
          height: 500,
        }}
        src={props.item.imageUrl}
        alt="image"
      />
    </Paper>
  );
}

export default Carousal;
