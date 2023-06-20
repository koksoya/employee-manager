import { BehaviorSubject } from "rxjs";
import { IEmployee } from "../types/interfaces";
import { EmployeeAPI } from "../API/EmployeeAPI";

export class EmployeeService {
  private employeesSubject$ = new BehaviorSubject<IEmployee[]>([]);
  private selectedEmployeeSubject$ = new BehaviorSubject<IEmployee | null>(
    null
  );
  private emailsSubject$ = new BehaviorSubject<string[]>([]);

  public readonly employees$ = this.employeesSubject$.asObservable();
  public readonly selectedEmployee$ =
    this.selectedEmployeeSubject$.asObservable();
  public readonly emails$ = this.emailsSubject$.asObservable();

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

  setSelectedEmployee(employee: IEmployee | null): void {
    this.selectedEmployee = employee;
  }

  async initializeEmployees(): Promise<void> {
    const employees = await EmployeeAPI.getAllEmployees();
    this.employees = employees;
    this.emails = employees.map((employee) => employee.email);
  }

  async setSelectedEmployeeById(id: string): Promise<void> {
    const data = await EmployeeAPI.getOneEmployee(id);
    this.selectedEmployee = data;
  }

  async createEmployee(employee: IEmployee): Promise<void> {
    await EmployeeAPI.createEmployee(employee);
  }

  async updateEmployee(employee: IEmployee): Promise<void> {
    await EmployeeAPI.updateEmployee(employee);
  }

  async deleteEmployee(id: string): Promise<void> {
    await EmployeeAPI.deleteEmployee(id);
  }
}

const employeeService = new EmployeeService();


export default employeeService;
