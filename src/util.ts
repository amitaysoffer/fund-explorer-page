export function reduceValues<T>(data: T[], key: keyof T) {
  return data.reduce((acc: unknown[], current: T) => {
    if (!acc.includes(current[key])) {
      return [...acc, current[key]];
    }

    return acc;
  }, []) as string[];
}
