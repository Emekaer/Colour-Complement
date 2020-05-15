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
},{[]
    title: "Tetradic",
    data: [tetradic("#FF0000").tetradic1,tetradic("#FF0000").tetradic2,tetradic("#FF0000").tetradic3]
}]  */

export const Complements = (selectedColor) => {
  return [
    {
      title: "Complementary Colour",
      data: complementaryColor(selectedColor),
    },
    {
      title: "Monochromatic 1",
      data: monoch(selectedColor).monoch1,
    },
    {
      title: "Monochromatic 2",
      data: monoch(selectedColor).monoch2,
    },
    {
      title: "Triad 1",
      data: triad(selectedColor).triad1,
    },
    {
      title: "Triad 2",
      data: triad(selectedColor).triad2,
    },
    {
      title: "Analogous 1",
      data: analogous(selectedColor).analog1,
    },
    {
      title: "Analogous 2",
      data: analogous(selectedColor).analog2,
    },
    {
      title: "Tetradic 1",
      data: tetradic(selectedColor).tetradic1,
    },
    {
      title: "Tetradic 2",
      data: tetradic(selectedColor).tetradic2,
    },
    {
      title: "Tetradic 3",
      data: tetradic(selectedColor).tetradic3,
    },
  ];
};
