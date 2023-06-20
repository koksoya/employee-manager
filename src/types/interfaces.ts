export interface IEmployee {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addresses: IAddress[];
  }

 export interface IAddress {
    streetName: string;
    postalCode: string;
    apartmentNumber: number;
    state: string;
    country: string;
  }