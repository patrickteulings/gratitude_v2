export interface Gratitude {
  body: string;
  color?: string;
  mood?: string;
  timeStamp: object | any;
  dayStamp: object | any;
  title: string;
  weather: object;
  location: object;
}

export interface GratitudeWrapper {
  id: string;
  data: Gratitude;
}

