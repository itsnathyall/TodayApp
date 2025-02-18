import express from 'express';
import { createTask, getTasks } from '../Controllers/taskController';

const router = express;

router.post('/', createTask);
router.get('/', getTasks);