import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

interface ICarsImageRepository{

  create(car_id: string, image_name: string): Promise<CarImage>
}

export { ICarsImageRepository };
