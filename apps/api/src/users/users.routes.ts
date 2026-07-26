import { Hono } from 'hono';
import * as handlers from './users.handlers';

const users = new Hono()
  .get('/', handlers.listUsers)
  .get('/:id', handlers.getUser)
  .post('/', handlers.createUser)
  .patch('/:id', handlers.updateUser)
  .delete('/:id', handlers.deleteUser);

export default users;
