import axios, { AxiosInstance } from 'axios';

interface Address {
    streetName: string;
    postalCode: string;
    apartmentNumber: number;
    state: string;
    country: string;
  }
 export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addresses: [Address];
  }


const API: AxiosInstance = axios.create({
  baseURL: 'https://procom-interview-employee-test.azurewebsites.net',
});


export const fetchEmployees = async (): Promise<Employee[]> => {
    const response = await API.get('/employee');
    return response.data;
  };