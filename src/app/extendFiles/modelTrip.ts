export interface trip {
    name: string;
    country: string;
    startDate: string;
    endDate: string;
    max: number;
    price: number;
    description: string;
    image: string;
    linkphoto :string[];
    numberOfRating: number;
    rating: number;
    rate: opinion[];


}
interface opinion {
    nick: string;
    date: string;
    opinia: string;
    opinionname:string;
  }