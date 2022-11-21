import { HttpService, Injectable } from '@nestjs/common';
import { GithubRepositoryResponse } from '../interfaces/github-repository-response';

@Injectable()
export class GithubRepositoryService {
  constructor(private httpService: HttpService) {}

  public async findNotForkedByUserName(
    userName: string,
    perPage: number,
  ): Promise<GithubRepositoryResponse[]> {
    const gitHubRepositories = await this.httpService
      .get<GithubRepositoryResponse[]>(
        `https://api.github.com/users/${userName}/repos`,
        {
          params: {
            per_page: perPage,
            sort: 'pushed',
            direction: 'desc',
          },
          headers: {
            accept: 'application/vnd.github.v3+json',
          },
        },
      )
      .toPromise();
    const response: GithubRepositoryResponse[] = [];
    for (const repository of gitHubRepositories.data) {
      if (!repository.fork) {
        response.push(repository);
      }
    }
    return response;
  }
}
