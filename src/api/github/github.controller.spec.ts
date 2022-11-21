import { HttpModule } from '@nestjs/common';
import { GithubBranchService } from '../../infrastructure/github/branch.service';
import { GithubRepositoryService } from '../../infrastructure/github/repository.service';
import { GithubIntegrationService } from '../../infrastructure/github/integration.service';
import { UserRepositoriesResponseDTO } from '../dto/apiResponse';
import { GithubController } from './github.controller';
import { Test } from '@nestjs/testing';

describe('GitHubController', () => {
  let githubController: GithubController;
  let githubIntegrationService: GithubIntegrationService;
  let githubRepository: GithubRepositoryService;
  let githubBranch: GithubBranchService;

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

    githubController = new GithubController(githubIntegrationService);
  });

  describe('GetUserRepositoriesNotForked', () => {
    it('should return an array of user response', async () => {
      const result: UserRepositoriesResponseDTO[] = [
        {
          branches: [
            {
              name: 'dependabot/npm_and_yarn/bcrypt-5.0.0',
              lastCommitSHA: '6834bd293e461cf9473aedb7fae88514a14db6e7',
            },
            {
              name: 'dependabot/npm_and_yarn/browserslist-4.16.6',
              lastCommitSHA: 'db9f4f0c1d7916844ea185c7eda60aac4bee04b7',
            },
            {
              name: 'dependabot/npm_and_yarn/client/acorn-5.7.4',
              lastCommitSHA: '165587a02e5ce8aad45c14ed838c888ed87b0aa9',
            },
            {
              name: 'dependabot/npm_and_yarn/client/ajv-6.12.6',
              lastCommitSHA: 'e28f58a4c10b168b159edf144d849ca75145639a',
            },
            {
              name: 'dependabot/npm_and_yarn/client/dns-packet-1.3.4',
              lastCommitSHA: 'c29ce6f0af5bb59fd83eb9162d196f479aff6497',
            },
            {
              name: 'dependabot/npm_and_yarn/client/elliptic-6.5.4',
              lastCommitSHA: 'bb42b20f5688775271db1e8945d55fee85a0d7cf',
            },
            {
              name: 'dependabot/npm_and_yarn/client/eventsource-1.1.1',
              lastCommitSHA: '4dbfdfc156d965607a3cb716f03dc40744e51209',
            },
            {
              name: 'dependabot/npm_and_yarn/client/follow-redirects-1.14.8',
              lastCommitSHA: '91bca73a196dfab90e067f216c9edb7bb3bb648c',
            },
            {
              name: 'dependabot/npm_and_yarn/client/handlebars-4.7.7',
              lastCommitSHA: '16f778aec99458c787aa23eeed21eedd252abf2e',
            },
            {
              name:
                'dependabot/npm_and_yarn/client/hapi/hoek-and-hapi/joi-8.5.1',
              lastCommitSHA: '17a73f22a1a2c6ef80a8f3c7da7daac1bddfdc29',
            },
            {
              name: 'dependabot/npm_and_yarn/client/hosted-git-info-2.8.9',
              lastCommitSHA: 'ed112bbb42d163565f04059ba81d09842fce9ad6',
            },
            {
              name: 'dependabot/npm_and_yarn/client/http-proxy-1.18.1',
              lastCommitSHA: '075f8a1c725b53a37a828f129f16d30691c9397e',
            },
            {
              name:
                'dependabot/npm_and_yarn/client/loader-utils-and-react-scripts-2.0.4',
              lastCommitSHA: 'c7378fc780b6fb173e1ebc14770e3628b57df9fd',
            },
            {
              name: 'dependabot/npm_and_yarn/client/lodash-4.17.21',
              lastCommitSHA: '58aed699757f83d60be27e20a5e9de512ce7e405',
            },
            {
              name: 'dependabot/npm_and_yarn/client/merge-deep-3.0.3',
              lastCommitSHA: '962ca65d45702ef91e584735653ede72e65e9bfd',
            },
            {
              name: 'dependabot/npm_and_yarn/client/node-sass-7.0.0',
              lastCommitSHA: '7a676488be7caca4b6555c8a9ce72fe2f362e8a1',
            },
            {
              name: 'dependabot/npm_and_yarn/client/path-parse-1.0.7',
              lastCommitSHA: 'f2ddb3b52446f958d6234e9ad543271220fce8ad',
            },
            {
              name: 'dependabot/npm_and_yarn/client/postcss-7.0.36',
              lastCommitSHA: '747222a770aa6bd69ef5324c04810cf27ad345b8',
            },
            {
              name: 'dependabot/npm_and_yarn/client/ssri-6.0.2',
              lastCommitSHA: '4dd240c9abe606516488deb97480f3608d3da0ea',
            },
            {
              name: 'dependabot/npm_and_yarn/client/tmpl-1.0.5',
              lastCommitSHA: 'd543c7b1c8618c4e2611efb05817e4f08679dc14',
            },
            {
              name: 'dependabot/npm_and_yarn/client/url-parse-1.5.10',
              lastCommitSHA: '05aab388ffb2d779376bdd37a7e213561193feb2',
            },
            {
              name: 'dependabot/npm_and_yarn/client/websocket-extensions-0.1.4',
              lastCommitSHA: 'd199141d7c0eb0c1dce760cb6c61f771b7d28535',
            },
            {
              name: 'dependabot/npm_and_yarn/client/ws-5.2.3',
              lastCommitSHA: '2dfc14a87dd26f22ed72e00adc7f4e9f98b434dc',
            },
            {
              name: 'dependabot/npm_and_yarn/client/y18n-3.2.2',
              lastCommitSHA: 'ff6a9acc8f45f24c39b4a19c1d57f2eb54edc137',
            },
            {
              name: 'dependabot/npm_and_yarn/hosted-git-info-2.8.9',
              lastCommitSHA: 'f2c5cfa026fc19d6ac6056041fcb33cb842bc2bb',
            },
            {
              name: 'dependabot/npm_and_yarn/lodash-4.17.21',
              lastCommitSHA: 'c46f27bcb8a294d707b255f9e94e39f9e88af5ab',
            },
            {
              name: 'dependabot/npm_and_yarn/moment-2.29.4',
              lastCommitSHA: 'ff17d6aa29bdbab562fe272b8faadd72769956f1',
            },
            {
              name: 'dependabot/npm_and_yarn/moment-timezone-0.5.37',
              lastCommitSHA: '3df03518c08da6e74db1a1eb934f3b1f215bd583',
            },
            {
              name: 'dependabot/npm_and_yarn/path-parse-1.0.7',
              lastCommitSHA: '4cdd98629a3f3963895f082fcc5dec27a0f48816',
            },
            {
              name: 'dependabot/npm_and_yarn/tree-kill-1.2.2',
              lastCommitSHA: 'f6286f7b6a04f2492d7379a75fcf190b06228e99',
            },
          ],
          ownerLogin: 'Vectormike',
          repositoryName: 'eAtom',
        },
      ];

      jest
        .spyOn(githubIntegrationService, 'getUserRepositoriesNotForked')
        .mockImplementation(async () => result);

      githubController
        .GetUserRepositoriesNotForked('Vectormike', 1)
        .then(res => {
          expect(res).toBe(result);
          expect(res).toHaveLength(1);
        });
    });
  });
});
