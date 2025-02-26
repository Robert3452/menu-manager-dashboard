export interface ILandingPage {
  title: string;
  description: string;
  image: string | File;
  buttons: IButton[];
}
export interface IButton {
  id: number;
  visible: boolean;
  index: number;
  name: string;
  link: string;
}
