import { httpBase } from './httpBaseUtil.ts';

export function v2Fetch(endpoint: string) {
  return httpBase().get(`${endpoint}`);
}
