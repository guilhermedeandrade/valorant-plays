import { Router } from 'express';

import usersRouter from './users';
import sessionsRouter from './sessions';
import playsRouter from './plays';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/plays', playsRouter);

export default routes;
