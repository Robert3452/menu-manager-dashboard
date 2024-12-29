export interface ILandingPage {
  title: string;
  description: string;
  image: string;
  buttons: IButton[];
}
export interface IButton {
  id: number;
  visible: boolean;
  index: number;
  name: string;
  link: string;
}
