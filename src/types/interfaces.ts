export interface IEmployee {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addresses: IAddress[];
  }

 export interface IAddress {
    streetName: string;
    postalCode: string;
    apartmentNumber: string;
    state: string;
    country: string;
  }