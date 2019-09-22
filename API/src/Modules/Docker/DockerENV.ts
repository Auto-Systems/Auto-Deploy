// API/src/Modules/Docker/DockerENV.ts
import { IsString } from 'class-validator'

export class DockerENV {
  @IsString()
  key: string

  @IsString()
  value: string
}