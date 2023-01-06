import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { CheckSpamDto } from './dtos/check-spam.dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  /**
   *
   * @param checkSpamDto
   * @returns
   */
  async isSpam(checkSpamDto: CheckSpamDto): Promise<boolean> {
    const { content, spamLinkDomains, redirectionDepth } = checkSpamDto;

    // content에서 링크찾기
    const urlRegex = new RegExp(
      /(?:(?:https?|ftp|file):\/\/|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/,
      'i',
    );
    const url = content.match(urlRegex).join('');

    const data = await lastValueFrom(
      this.httpService.get(url).pipe(
        map((html) => {
          const aHrefRegex = html?.data.match(
            /(?:(<a href=['"])(?:https?|ftp|file):\/\/|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/i,
          );
        }),
      ),
    );

    // 링크에서 리다이렉션 되는지
    return true;
  }
}
