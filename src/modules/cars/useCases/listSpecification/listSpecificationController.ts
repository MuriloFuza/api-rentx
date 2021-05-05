import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationUseCase } from './listSpecificationUseCase';

class ListSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(ListSpecificationUseCase);
    const allSpecification = await listSpecificationUseCase.execute();

    return response.json(allSpecification);
  }
}

export { ListSpecificationController };
