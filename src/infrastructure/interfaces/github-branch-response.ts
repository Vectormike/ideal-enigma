export class GithubBranchResponse {
  name: string;
  commit: Commit;
  protected: boolean;
}

class Commit {
  sha: string;
  url: string;
}
