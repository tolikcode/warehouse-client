export const request = async (method: string, url: string, payload: any = null) => {
  const options = { method } as any;
  if (payload) {
    options.body = JSON.stringify(payload);
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Status Code: ${response.status} Received from ${response.url}`);
  }
  return response;
};
