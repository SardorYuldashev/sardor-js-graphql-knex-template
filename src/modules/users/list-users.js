import db from '../../db/index.js';

export const listUsers = (filter = {}) => {
  return db('users').where({ ...filter, is_deleted: false }).select('*');
};