import { BehaviorSubject } from "rxjs";
import { IEmployee } from "../types/interfaces";
import { EmployeeAPI } from "../API/EmployeeAPI";

export class EmployeeService {
  private employeesSubject$ = new BehaviorSubject<IEmployee[]>([]);
  private selectedEmployeeSubject$ = new BehaviorSubject<IEmployee | null>(
    null
  );
  private emailsSubject$ = new BehaviorSubject<string[]>([]);
  private errorMessageSubject$ = new BehaviorSubject<string | null>(null);

  public readonly employees$ = this.employeesSubject$.asObservable();
  public readonly selectedEmployee$ =
    this.selectedEmployeeSubject$.asObservable();
  public readonly emails$ = this.emailsSubject$.asObservable();
  public readonly errorMessage$ = this.errorMessageSubject$.asObservable();

  get employees(): IEmployee[] {
    return this.employeesSubject$.getValue();
  }

  set employees(value: IEmployee[]) {
    this.employeesSubject$.next(value);
  }

  get selectedEmployee(): IEmployee | null {
    return this.selectedEmployeeSubject$.getValue();
  }

  set selectedEmployee(value: IEmployee | null) {
    this.selectedEmployeeSubject$.next(value);
  }

  get emails(): string[] {
    return this.emailsSubject$.getValue();
  }

  set emails(value: string[]) {
    this.emailsSubject$.next(value);
  }

  get errorMessage(): string | null {
    return this.errorMessageSubject$.getValue();
  }

  set errorMessage(value: string | null) {
    this.errorMessageSubject$.next(value);
  }

  setErrorMessage(message: string | null): void {
    this.errorMessage = message;
  }

  setSelectedEmployee(employee: IEmployee | null): void {
    this.selectedEmployee = employee;
  }

  async initializeEmployees(): Promise<void> {
    try {
      const employees = await EmployeeAPI.getAllEmployees();
      this.employees = employees;
      this.emails = employees.map((employee) => employee.email);
    } catch (error) {
      this.errorMessage = "Could not load employees";
    }
  }

  async setSelectedEmployeeById(id: string): Promise<void> {
    try {
      const data = await EmployeeAPI.getOneEmployee(id);
      this.selectedEmployee = data;
      this.errorMessage = null; // Clear the error message if the employee is found
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        this.selectedEmployee = null; // Set selectedEmployee to null if the employee is not found
        this.errorMessage = "Could not find employee";
      } else {
        this.errorMessage = "Failed to fetch employee";
      }
    }
  }

  async createEmployee(employee: IEmployee): Promise<void> {
    try {
      await EmployeeAPI.createEmployee(employee);
    } catch (error) {
      this.errorMessage = "Could not create employee";
    }
  }

  async updateEmployee(employee: IEmployee): Promise<void> {
    try {
      await EmployeeAPI.updateEmployee(employee);
    } catch (error) {
      this.errorMessage = "Could not update employee";
    }
  }

  async deleteEmployee(id: string): Promise<void> {
    try {
      await EmployeeAPI.deleteEmployee(id);
    } catch (error) {
      this.errorMessage = "Could not delete employee";
    }
  }
}

const employeeService = new EmployeeService();


export default employeeService;
