export interface ILandingPage {
  title: string;
  description: string;
  image: string;
  buttons: IButton[];
}
export interface IButton {
  id: number;
  index: number;
  name: string;
  link: string;
}
