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
    <Carousel indicators={false}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props) {
  return (
    <Paper className="carousalImages">
      <img
        src={props.item.imageUrl}
        alt="image"
        style={{ height: "auto", width: "100%" }}
      />
    </Paper>
  );
}

export default Carousal;
