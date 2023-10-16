import organgeJuice from "../images/817dBJQN1qL.jpg";
import rice from "../images/1681187131-8074.jpg";
import tomatoes from "../images/tomatoes-1296x728-feature.jpg";
import bread from "../images/slices-dark-white-bread-box-tablecloth.jpg";
import Salmon from "../images/Shutterstock_1191507805-1000-×-1000-750x750.jpg";
import banans from "../images/Health-Benefits-of-Bananas.jpg";
import pasta from "../images/pro_82341.jpg";
import cucumbers from "../images/cucumbers.jpg";
import eggs from "../images/raw-fresh-white-chicken-eggs-placed-stone-surface.jpg";
import onions from "../images/red-onions-7110784-hero-79e37549208f4b21a95481bcb7725cb1.jpg";
import Spinach from "../images/71CcHUG0B0L.jpg";
import milk from "../images/26187.jpg";
import other from "../images/pexels-anna-shvets-3962292.jpg";
import apple from "../images/apples-101-about-1440x810.jpg";
export default class FilterAction {}

FilterAction.getIcon = (name) => {
  let type = name.toLowerCase();
  let value = other;
  switch (type) {
    case "organge juice":
      value = organgeJuice;
      break;
    case "milk":
      value = milk;
      break;
    case "bread":
      value = bread;
      break;
    case "eggs":
      value = eggs;
      break;
    case "bananas":
      value = banans;
      break;
    case "pasta":
      value = pasta;
      break;
    case "tomatoes":
      value = tomatoes;
      break;
    case "rice":
      value = rice;
      break;
    case "salmon":
      value = Salmon;
      break;
    case "onions":
      value = onions;
      break;
    case "cucumbers":
      value = cucumbers;
      break;
    case "spinach":
      value = Spinach;
      break;
    case "apples":
      value = apple;
      break;
    default:
      value = other;
  }
  return value;
};
