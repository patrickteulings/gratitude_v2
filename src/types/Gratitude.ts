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

interface Longname {
  long_name: string;
}

export interface Addresscomponents {
  address_components: Array<Longname>;
}


export interface Response {
  plus_code?: any | null;
  results: Array<Addresscomponents> | null;
  status: string | null;
}
