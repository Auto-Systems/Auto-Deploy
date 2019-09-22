// API/src/Modules/Controllers/CoreTemplates/CoreTemplateResolver.ts
import { AuthContext } from 'API/Context';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { CoreTemplate } from './CoreTemplateModel';
import { CreateCoreTemplateInput } from './CreateCoreTemplateInput';

@Resolver(() => CoreTemplate)
export class CoreTemplateResolver {
  @Authorized()
  @Query((returns) => [CoreTemplate])
  public async coreTemplates(@Ctx()
  {
    controller: { record },
  }: AuthContext): Promise<CoreTemplate[]> {
    return CoreTemplate.find({ where: { controllerId: record.id } });
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
