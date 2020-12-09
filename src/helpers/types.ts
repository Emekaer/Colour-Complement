export interface PresenterComponentsProps {
  chosenColour: string;
}

export interface ColourTile1Props extends PresenterComponentsProps {
  selection: () => void;
  selectionMode: boolean;
  pressHandler: () => void;
  schemeType: string;
  schemeColor?: any;
}

export interface ColorArray {
  title: "string";
  data: () => string;
}
