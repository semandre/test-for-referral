export function isEmpty(object: any): boolean {
  return Object.values(object).every((res: any) => !res);
}
