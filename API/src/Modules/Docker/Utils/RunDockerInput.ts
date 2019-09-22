// API/src/Modules/Docker/Utils/RunDockerInput.ts
import { IsArray, IsString } from 'class-validator';
import { DockerENV } from '../DockerENV';

export class RunDockerInput {
  @IsString()
  image: string;

  @IsArray()
  cmd?: string[];

  @IsArray()
  env?: DockerENV[];

  hostConfig?: Object;
}
