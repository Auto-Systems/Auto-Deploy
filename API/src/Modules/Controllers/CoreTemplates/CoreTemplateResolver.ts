// API/src/Modules/Controllers/CoreTemplates/CoreTemplateResolver.ts
import { Resolver, Query, Authorized, Mutation, Arg, Ctx } from 'type-graphql';
import { CoreTemplate } from './CoreTemplateModel';
import { AuthContext } from 'API/Context';
import { CreateCoreTemplateInput } from './CreateCoreTemplateInput';

@Resolver(() => CoreTemplate)
export class CoreTemplateResolver {
  @Query((returns) => [CoreTemplate])
  @Authorized()
  public async coreTemplates(): Promise<CoreTemplate[]> {
    return CoreTemplate.find();
  }

  @Authorized(['Admin'])
  @Mutation((returns) => CoreTemplate)
  public async createCoreTemplate(
    @Arg('input') input: CreateCoreTemplateInput,
    @Ctx() { controller: { record, controller } }: AuthContext,
  ): Promise<CoreTemplate> {
    const newTemplate = CoreTemplate.create({
      controller: record,
      ...input,
    });
    return newTemplate.save();
  }
}
