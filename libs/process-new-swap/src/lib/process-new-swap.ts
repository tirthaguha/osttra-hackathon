import { createHash } from 'node:crypto'
import * as fs from 'fs';

export function processNewSwap(data: any): any {
  data.createTime = Date.now()
  data.status = "Pending";
  const hex = createHash('sha256').update(JSON.stringify(data)).digest('hex')
  const newData = JSON.stringify(data) + "  " + hex;
  fs.writeFile('helloworld.txt', newData, function (err) {
    if (err) return err;
  });
  return { hex, data };
}
