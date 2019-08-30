export function getChanges(oldArray: any, newArray: any): boolean {
  return JSON.stringify(oldArray) === JSON.stringify(newArray);
}
