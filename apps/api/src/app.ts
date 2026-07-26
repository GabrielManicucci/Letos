import { Hono } from 'hono';
import users from './users/users.routes';

const app = new Hono()
  .route('/users', users);

export default app;
