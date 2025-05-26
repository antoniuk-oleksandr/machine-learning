export const getBackendHost = () => {
  return 'http://78.137.15.239:8080'
}

export const findMaxEntry = (resultData: Record<string, number>) =>
  Object.entries(resultData).reduce((max, current) => {
    return current[1] > max[1] ? current : max;
  });
