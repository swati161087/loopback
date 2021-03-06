import {Entity, model, property} from '@loopback/repository';

@model()
export class Students extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  Id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Students>) {
    super(data);
  }
}

export interface StudentsRelations {
  // describe navigational properties here
}

export type StudentsWithRelations = Students & StudentsRelations;
