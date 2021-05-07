import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudentDataSource} from '../datasources';
import {Students, StudentsRelations} from '../models';

export class StudentRepository extends DefaultCrudRepository<
  Students,
  typeof Students.prototype.Id,
  StudentsRelations
> {
  constructor(
    @inject('datasources.student') dataSource: StudentDataSource,
  ) {
    super(Students, dataSource);
  }
}
