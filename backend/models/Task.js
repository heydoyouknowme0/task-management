import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content:{
    type: String,
    default: '',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subTasks: [
    {
      task: {
        type: String,
        required: true,
      },
      done: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'up for review','done'],
    default: 'todo',
  },
  assigned: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  teamCode: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },

}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
