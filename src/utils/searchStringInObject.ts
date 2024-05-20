export function searchStringInObject(search: string, obj: any) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      if (searchStringInObject(search, obj[key])) {
        return true;
      }
    } else if (typeof obj[key] === 'string') {
      if (obj[key].includes(search)) {
        return true;
      }
    }
  }

  return false;
}