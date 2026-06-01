export const sendSuccess = (res, { statusCode = 200, message = 'Success', data = null } = {}) => {
  const body = { success: true, message };
  if (data !== null) body.data = data;
  return res.status(statusCode).json(body);
};
