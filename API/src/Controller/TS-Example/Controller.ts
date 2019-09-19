// API/src/Controller/TS-Example/Controller.ts
import { ControllerModule, controllerMethod } from '../Decorators'
import { InitControllerParams } from '../types';

@ControllerModule({ name: 'TSExample' })
export class TSExampleControllerModule {

  @controllerMethod({ type: 'initController' })
  public async initController({
    token,
    host,
  }: InitControllerParams): Promise<void> {
    console.log('Init TSExample Controller')
  }
}