import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiProduces,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GithubIntegrationService } from '../../infrastructure/github/integration.service';
import { UserRepositoriesResponseDTO } from '../dto/apiResponse';
import { HeaderInterceptor } from '../interceptors/header.interceptor';

@Controller('github')
@ApiTags('GitHub')
@UseInterceptors(HeaderInterceptor)
@ApiBasicAuth()
export class GithubController {
  constructor(private githubIntegrationService: GithubIntegrationService) {}
  @Get(':userName')
  @ApiProduces('application/json', 'application/xml')
  @ApiCreatedResponse({
    type: UserRepositoriesResponseDTO,
  })
  @ApiQuery({
    name: 'limitSearch',
    required: false,
    schema: { default: 10 },
  })
  public async GetUserRepositoriesNotForked(
    @Param('userName') userName: string,
    @Query('limitSearch') limitSearch = 10,
  ): Promise<UserRepositoriesResponseDTO[]> {
    try {
      const userRepositories = await this.githubIntegrationService.getUserRepositoriesNotForked(
        userName,
        limitSearch,
      );
      return userRepositories;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'User Not Found',
        });
      }

      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }
}
