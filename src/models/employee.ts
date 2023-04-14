export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addresses: [Address];
  }

  interface Address {
    streetName: string;
    postalCode: string;
    apartmentNumber: number;
    state: string;
    country: string;
  }