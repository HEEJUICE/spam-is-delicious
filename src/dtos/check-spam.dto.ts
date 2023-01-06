import { IsArray, IsInt, IsString } from 'class-validator';

export class CheckSpamDto {
  /**
   * 유저가 쓴 content
   */
  @IsString()
  content: string;

  /**
   * 스팸 링크 (도메인)
   */
  @IsArray()
  @IsString({ each: true })
  spamLinkDomains: string[];

  /**
   * 스팸 체크를 위해 탐색할 depth
   */
  @IsInt()
  redirectionDepth: number;
}
