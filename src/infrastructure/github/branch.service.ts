import { HttpService, Injectable } from '@nestjs/common';
import { GithubBranchResponse } from '../interfaces/github-branch-response';

@Injectable()
export class GithubBranchService {
  constructor(private httpService: HttpService) {}
  async getBranches(
    userName: string,
    repositoryName: string,
  ): Promise<GithubBranchResponse[]> {
    const githubCommitResponse = await this.httpService
      .get<GithubBranchResponse[]>(
        `https://api.github.com/repos/${userName}/${repositoryName}/branches`,
        {
          headers: {
            accept: 'application/vnd.github.v3+json',
          },
        },
      )
      .toPromise();

    return githubCommitResponse.data;
  }
}
