import { IUser } from '@/types/UserType'

export interface IGratitude {
  body: string;
  color?: string;
  mood?: string;
  timeStamp: object | any;
  dayStamp: object | any;
  title: string;
  weather: object;
  location: object;
  user?: IUser;
}

export interface IGratitudeWrapper {
  id: string;
  data: IGratitude;
}

interface ILongname {
  long_name: string;
}

export interface IAddresscomponents {
  address_components: Array<ILongname>;
}


export interface IResponse {
  plus_code?: any | null;
  results: Array<IAddresscomponents> | null;
  status: string | null;
}
