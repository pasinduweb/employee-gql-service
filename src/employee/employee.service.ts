import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    // return this.employeeRepository.find();
    const emp: Employee = new Employee();
    emp.id = '123abc';
    emp.firstName = 'Kamal';
    emp.lastName = 'K';
    emp.designation = 'QA';

    return [emp];
  }
}
