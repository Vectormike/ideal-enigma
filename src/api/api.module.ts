import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { GithubController } from './github/github.controller';

@Module({
  controllers: [GithubController],
  imports: [InfrastructureModule],
  exports: [],
})
export class ApiModule {}
