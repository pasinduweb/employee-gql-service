import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}
  create(project: CreateProjectInput): Promise<Project> {
    const proj = this.projectRepository.create(project);
    return this.projectRepository.save(proj); // Can directly use this without create, depends on DTO
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['employees'],
    });
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id: id.toString() },
      relations: ['employees'],
    });
  }

  update(id: string, updateProjectInput: UpdateProjectInput) {
    const project: Project = this.projectRepository.create(updateProjectInput);
    project.id = id;
    return this.projectRepository.save(project);
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
