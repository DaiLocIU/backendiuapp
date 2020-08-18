const parse =  require('date-fns/parse');
const addMilliseconds = require('date-fns/addMilliseconds')
import { AutoMap } from 'nestjsx-automapper';
const ms = require('ms')

export class TokenResultDto {
  @AutoMap()
  token: string;
  @AutoMap()
  expiry: Date;

  computeExpiry(jwtExpired: string) {
    const milli = ms(jwtExpired);
    const now = Date.now();
    this.expiry = parse(addMilliseconds(now, milli).toLocaleString(), 'M/d/yyyy, h:mm:ss aaa', now);
  }
}
