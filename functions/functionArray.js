import {
  complementaryColor,
  triad,
  analogous,
  tetradic,
  monoch,
} from "./functions";

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
},{
    title: "Tetradic",
    data: [tetradic("#FF0000").tetradic1,tetradic("#FF0000").tetradic2,tetradic("#FF0000").tetradic3]
}]  */

export default Complements = [
  {
    title: "Complementary Colour",
    data: complementaryColor("#FF0000"),
  },
  {
    title: "Monochromatic1",
    data: monoch("#FF0000").monoch1,
  },
  {
    title: "Monochromatic2",
    data: monoch("#FF0000").monoch2,
  },
  {
    title: "Triad1",
    data: triad("#FF0000").triad1,
  },
  {
    title: "Triad2",
    data: triad("#FF0000").triad2,
  },
  {
    title: "Analogous1",
    data: analogous("#FF0000").analog1,
  },
  {
    title: "Analogous2",
    data: analogous("#FF0000").analog2,
  },
  {
    title: "Tetradic1",
    data: tetradic("#FF0000").tetradic1,
  },
  {
    title: "Tetradic2",
    data: tetradic("#FF0000").tetradic2,
  },
  {
    title: "Tetradic3",
    data: tetradic("#FF0000").tetradic3,
  },
];
 

