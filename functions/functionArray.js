import {
  complementaryColor,
  triad,
  analogous,
  tetradic,
  monoch,
} from "./functions";
import {useSelector} from "react-redux";

/* export default Complements = [{
    title: "Complementary Colour",
    data: [complementaryColor("#FF0000")]
},{
    title: "Monochromatic",
    data: [monoch("#FF0000").monoch1, monoch("#FF0000").monoch2]
},{
    title: "Triad",
    data:[ triad("#FF0000").triad1, triad("#FF0000").triad2 ]
},{
    title: "Analogous",
    data: [analogous("#FF0000").analog1,analogous("#FF0000").analog2]
},{[]
    title: "Tetradic",
    data: [tetradic("#FF0000").tetradic1,tetradic("#FF0000").tetradic2,tetradic("#FF0000").tetradic3]
}]  */



export default Complements = [
  {
     title: "Complementary Colour",
    data: complementaryColor(!!color ? color : "#FF0000"),
  },
  {
    title: "Monochromatic 1",
    data: monoch(!!color ? color : "#FF0000").monoch1,
  },
  {
    title: "Monochromatic 2",
    data: monoch(!!color ? color : "#FF0000").monoch2,
  },
  {
    title: "Triad 1",
    data: triad(!!color ? color : "#FF0000").triad1,
  },
  {
    title: "Triad 2",
    data: triad(!!color ? color : "#FF0000").triad2,
  },
  {
    title: "Analogous 1",
    data: analogous(!!color ? color : "#FF0000").analog1,
  },
  {
    title: "Analogous 2",
    data: analogous(!!color ? color : "#FF0000").analog2,
  },
  {
    title: "Tetradic 1",
    data: tetradic(!!color ? color : "#FF0000").tetradic1,
  },
  {
    title: "Tetradic 2",
    data: tetradic(!!color ? color : "#FF0000").tetradic2,
  },
  {
    title: "Tetradic 3",
    data: tetradic(!!color ? color : "#FF0000").tetradic3,
  },
];
 

