const express = require('express');
const router = express.Router();
const controller = require('../controllers/task-controller');

// GET /api/tasks?priority=&status=&search=
router.get('/', controller.getAllTasks);

// GET /api/tasks/:id
router.get('/:id', controller.getTaskById);

// POST /api/tasks
router.post('/', controller.createTask);

// PUT /api/tasks/:id
router.put('/:id', controller.updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', controller.deleteTask);

module.exports = router;
