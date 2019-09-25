const _ = require('lodash');

const { projects, tasks } = require('../data/data');

// resolver是決定schema中的field該如何執行得函數
// tip: GraphQL resolvers 可以返回 Promise
const resolvers = {
  Query: {
    // Get a project by name
    projectByName: (root, { name }) => _.find(projects, { name }),

    // Fetch all tasks
    fetchTasks: () => tasks,

    // Get a task by ID
    getTask: (root, { id }) => _.find(tasks, { id })
  },
  Mutation: {
    // Mark a task as completed
    markAsCompleted: (root, { taskID }) => {
      const task = _.find(tasks, { id: taskID });

      // Throw new error if the task doesn't exist
      if (! task) {
        throw new Error(`Couldn't find the task with id ${taskID}`);
      }

      // Throw error if task is already completed
      if (task.completed) {
        throw new Error(`Task with id ${taskID} is already completed`);
      }

      task.completed = true;

      return task;
    }
  },
  Project: {
    tasks: (project) => _.filter(tasks, { projectID: project.id })
  },
  Task: {
    project: (task) => _.find(projects, { id: task.projectID })
  }
};

module.exports = resolvers;
