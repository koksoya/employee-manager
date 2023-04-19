import axios from 'axios';
import { IEmployee } from '../models/employee'

const BASE_URL = 'https://procom-interview-employee-test.azurewebsites.net';

export const EmployeeAPI = {
  getAllEmployees: async (): Promise<IEmployee[]> => {
    const response = await axios.get<IEmployee[]>(`${BASE_URL}/employee`);
    return response.data;
  },
  getOneEmployee: async (id: string): Promise<IEmployee> => {
    const response = await axios.get<IEmployee>(`${BASE_URL}/employee/${id}`);
    return response.data;
  },
  createEmployee: async (): Promise<IEmployee> => {
    const response = await axios.post<IEmployee>(`${BASE_URL}/employee`);
    return response.data;
  },
  updateEmployee: async (employee: IEmployee): Promise<void> => {
    await axios.put(`${BASE_URL}/employee/${employee.id}`, employee);
  },
  deleteEmployee: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/employee/${id}`);
  },
};

