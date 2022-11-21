import { HttpModule, HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { GithubBranchResponse } from '../interfaces/github-branch-response';
import { GithubRepositoryResponse } from '../interfaces/github-repository-response';
import { GithubBranchService } from './branch.service';
import { GithubRepositoryService } from './repository.service';
import { GithubIntegrationService } from './integration.service';
import {
  resultGithubRepositoryResponse,
  resultGithubRepositoryResponseForked,
} from '../../../test/githubRepositoryResult';

describe('GitHubService', () => {
  let githubIntegrationService: GithubIntegrationService;
  let githubRepository: GithubRepositoryService;
  let githubBranch: GithubBranchService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        GithubBranchService,
        GithubRepositoryService,
        GithubIntegrationService,
      ],
    }).compile();
    githubRepository = module.get<GithubRepositoryService>(
      GithubRepositoryService,
    );
    githubBranch = module.get<GithubBranchService>(GithubBranchService);

    githubIntegrationService = new GithubIntegrationService(
      githubRepository,
      githubBranch,
    );

    httpService = module.get<HttpService>(HttpService);
  });

  describe('getBranches', () => {
    it('should return an array of repositories branches', done => {
      const result: GithubBranchResponse[] = [
        {
          name: 'Vectormike',
          commit: {
            sha: 'Sha',
            url: 'URL',
          },
          protected: false,
        },
      ];

      const response: AxiosResponse<GithubBranchResponse[]> = {
        data: result,
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl' },
        status: 200,
        statusText: 'OK',
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

      githubBranch.getBranches('Vectormike', 'repositoryName').then(res => {
        expect(res).toEqual(result);
        done();
      });
    });
  });

  describe('getRepositories', () => {
    it('should return an array of repositories', done => {
      const result: GithubRepositoryResponse[] = resultGithubRepositoryResponse;

      const response: AxiosResponse<GithubRepositoryResponse[]> = {
        data: result,
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl' },
        status: 200,
        statusText: 'OK',
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

      githubRepository.findNotForkedByUserName('Vectormike', 10).then(res => {
        expect(res).toEqual(result);
        done();
      });
    });

    it('should return an array of repositories and exclude forks', done => {
      const resultForked: GithubRepositoryResponse[] = resultGithubRepositoryResponseForked;
      const result: GithubRepositoryResponse[] = resultGithubRepositoryResponse;

      const response: AxiosResponse<GithubRepositoryResponse[]> = {
        data: resultForked,
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl' },
        status: 200,
        statusText: 'OK',
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

      githubRepository.findNotForkedByUserName('Vectormike', 10).then(res => {
        expect(res).toHaveLength(1);
        expect(res).toEqual(result);
        done();
      });
    });
  });
});
