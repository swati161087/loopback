import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Students} from '../models';
import {StudentRepository} from '../repositories';

export class StudentController {
  constructor(
    @repository(StudentRepository)
    public studentRepository : StudentRepository,
  ) {}

  @post('/students')
  @response(200, {
    description: 'Students model instance',
    content: {'application/json': {schema: getModelSchemaRef(Students)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, {
            title: 'NewStudents',
            
          }),
        },
      },
    })
    students: Students,
  ): Promise<Students> {
    return this.studentRepository.create(students);
  }

  @get('/students/count')
  @response(200, {
    description: 'Students model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Students) where?: Where<Students>,
  ): Promise<Count> {
    return this.studentRepository.count(where);
  }

  @get('/students')
  @response(200, {
    description: 'Array of Students model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Students, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Students) filter?: Filter<Students>,
  ): Promise<Students[]> {
    return this.studentRepository.find(filter);
  }

  @patch('/students')
  @response(200, {
    description: 'Students PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, {partial: true}),
        },
      },
    })
    students: Students,
    @param.where(Students) where?: Where<Students>,
  ): Promise<Count> {
    return this.studentRepository.updateAll(students, where);
  }

  @get('/students/{id}')
  @response(200, {
    description: 'Students model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Students, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Students, {exclude: 'where'}) filter?: FilterExcludingWhere<Students>
  ): Promise<Students> {
    return this.studentRepository.findById(id, filter);
  }

  @patch('/students/{id}')
  @response(204, {
    description: 'Students PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Students, {partial: true}),
        },
      },
    })
    students: Students,
  ): Promise<void> {
    await this.studentRepository.updateById(id, students);
  }

  @put('/students/{id}')
  @response(204, {
    description: 'Students PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() students: Students,
  ): Promise<void> {
    await this.studentRepository.replaceById(id, students);
  }

  @del('/students/{id}')
  @response(204, {
    description: 'Students DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.studentRepository.deleteById(id);
  }
}
