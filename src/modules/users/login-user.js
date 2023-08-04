import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../shared/config/index.js';
import db from '../../db/index.js';
import { UnauthorizedError } from '../../shared/errors/index.js';

export const loginUser = async ({ username, password }) => {
  const existing = await db('users').where({ username, is_deleted: false }).first();

  if (!existing) {
    throw new UnauthorizedError('Username yoki password xato');
  };

  const match = await bcryptjs.compare(password, existing.password);
  if (!match) {
    throw new UnauthorizedError('Username yoki password xato');
  };

  const payload = { user: { id: existing.id } };
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn: '5h' });

  return { token };
};
