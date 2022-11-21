import { HttpModule, Module } from '@nestjs/common';
import { GithubBranchService } from './github/branch.service';
import { GithubRepositoryService } from './github/repository.service';
import { GithubIntegrationService } from './github/integration.service';

@Module({
  imports: [HttpModule],
  providers: [
    GithubIntegrationService,
    GithubRepositoryService,
    GithubBranchService,
  ],
  exports: [
    GithubIntegrationService,
    GithubRepositoryService,
    GithubBranchService,
  ],
})
export class InfrastructureModule {}
