import { CarRepositoryInMemory } from '@modules/cars/Repositories/in-memory/CarRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;

describe('Listagem de carros ', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('Deve ser possível listar todos os carros disponíveis', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Deve ser possível listar todos os carros disponíveis pelo nome', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'NameCar_test',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1235',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({
      name: 'NameCar_test',
    });

    expect(cars).toEqual([car]);
  });

  it('Deve ser possível listar todos os carros disponíveis pela marca', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'NameCar_test2',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1236',
      fine_amount: 60,
      brand: 'Brand_test',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Brand_test',
    });

    expect(cars).toEqual([car]);
  });

  it('Deve ser possível listar todos os carros disponíveis pela categoria', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'NameCar_test3',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1237',
      fine_amount: 60,
      brand: 'Brand_test',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'category_id',
    });

    expect(cars).toEqual([car]);
  });
});
