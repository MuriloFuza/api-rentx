import { CarRepositoryInMemory } from '@modules/cars/Repositories/in-memory/CarRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/Repositories/in-memory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Criar Specificação do carro', () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    carRepositoryInMemory = new CarRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryInMemory, specificationRepositoryInMemory,
    );
  });

  it('Não deve ser possível adicionar uma especificação para um carro que não existe', async () => {
    const car_id = '123';
    const specification_id = ['456'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id, specification_id,
      }),
    ).rejects.toEqual(new AppError('Car does not exists!'));
  });

  it('Deve ser possível adicionar uma nova especificação para o carro', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await specificationRepositoryInMemory.create({
      name: 'test',
      description: 'test',
    });

    const specification_id = [specification.id];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id, specification_id,
    });
    expect(specificationCars).toHaveProperty('specifications');
    expect(specificationCars.specifications.length).toBe(1);
  });
});
