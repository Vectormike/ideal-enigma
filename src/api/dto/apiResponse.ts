import { ApiProperty } from '@nestjs/swagger';

export class Branch {
  @ApiProperty({
    type: String,
    description: 'Branch name',
  })
  name: string;
  @ApiProperty({
    type: String,
    description: 'Last commit SHA of the branch',
  })
  lastCommitSHA: string;
}

export class UserRepositoriesResponseDTO {
  @ApiProperty({
    type: String,
    description: 'Repository name',
  })
  repositoryName: string;
  @ApiProperty({
    type: String,
    description: 'Owner Login name',
  })
  ownerLogin: string;
  @ApiProperty({
    type: [Branch],
    description: 'Branches',
  })
  branches: Branch[];
}
