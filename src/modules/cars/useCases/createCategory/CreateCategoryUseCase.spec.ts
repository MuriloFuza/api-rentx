/**
 * Todos as descrições dos testes serão descritos em português
 */

import { CategoriesRepositoryInMemory } from '@modules/cars/Repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Criar uma categoria', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('Deve ser capaz de criar uma nova categoria', async () => {
    const category = {
      name: 'Categoria de teste',
      description: 'Descrição da categoria',
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar uma categoria com nome já existente', async () => {
    const category = {
      name: 'Categoria de teste',
      description: 'Descrição da categoria',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })).rejects.toEqual(new AppError('Category already exists!'));
  });
});
