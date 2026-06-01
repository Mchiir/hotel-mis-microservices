import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as userService from '../services/user.service.js';

export const listUsers = asyncHandler(async (req, res) => {
  const result = await userService.listUsers(req.query);
  sendSuccess(res, {
    message: 'Users retrieved',
    data: result,
  });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  sendSuccess(res, {
    message: 'User retrieved',
    data: { user },
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body, req.user.id);
  sendSuccess(res, {
    message: 'User updated',
    data: { user },
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.deleteUser(req.params.id, req.user.id);
  sendSuccess(res, {
    message: 'User deleted',
    data: { user },
  });
});
