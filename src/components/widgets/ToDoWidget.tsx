import React, { useState } from 'react';
import { CheckSquare, Plus, Check, Trash2 } from 'lucide-react';
import { Task } from '../../types/dashboard';

interface ToDoWidgetProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (text: string) => void;
  onDeleteTask: (id: string) => void;
}

export const ToDoWidget: React.FC<ToDoWidgetProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
}) => {
  const [newTaskInput, setNewTaskInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // 4-segment progress bar logic
  // segment 1: 0-25%, segment 2: 25-50%, segment 3: 50-75%, segment 4: 75-100%
  const getSegmentFill = (segmentIndex: number) => {
    // segmentIndex: 0, 1, 2, 3
    const minThreshold = segmentIndex * 25;
    if (percentage >= minThreshold + 25) return 100;
    if (percentage <= minThreshold) return 0;
    return ((percentage - minThreshold) / 25) * 100;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskInput.trim()) {
      onAddTask(newTaskInput.trim());
      setNewTaskInput('');
      setShowInput(false);
    }
  };

  return (
    <div className="rounded-[24px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)] p-4 flex flex-col justify-between h-full min-h-[310px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <CheckSquare strokeWidth={1.75} className="w-4 h-4 text-[#E85D68]" />
            <h2 className="text-[14px] font-medium tracking-[-0.01em] text-[#F3F4F6]">
              To Do
            </h2>
            <span className="text-[11px] text-[#9CA3AF] font-mono">
              {completed}/{total}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowInput(!showInput)}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>{showInput ? 'Cancel' : 'Add'}</span>
          </button>
        </div>

        {/* 4-Segment Progress Bar */}
        <div className="mb-3.5">
          <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] mb-1.5">
            <span>Focus Completion</span>
            <span className="font-mono text-[#E85D68] font-medium">{percentage}%</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 h-1.5">
            {[0, 1, 2, 3].map((seg) => {
              const fill = getSegmentFill(seg);
              return (
                <div
                  key={seg}
                  className="relative h-full bg-[#1A1D24] rounded-full overflow-hidden border border-white/[0.04]"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-[#E85D68] transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(232,93,104,0.4)]"
                    style={{ width: `${fill}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Inline Add Input */}
        {showInput && (
          <form onSubmit={handleCreate} className="mb-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[12px] bg-[#1A1D24] border border-[#E85D68]/40 shadow-inner">
              <input
                type="text"
                placeholder="Type task & press Enter..."
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                autoFocus
                className="bg-transparent text-xs text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none w-full"
              />
              <button
                type="submit"
                className="text-[11px] font-medium text-[#E85D68] hover:text-white px-2 py-0.5 rounded-md bg-[#E85D68]/20"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {/* Tasks List */}
        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-0.5">
          {tasks.length === 0 ? (
            <div className="py-6 text-center text-xs text-[#6B7280]">
              No active tasks. Press + Add to create one.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`group flex items-center justify-between px-3 py-2 rounded-[14px] bg-[#1A1D24]/75 hover:bg-[#232732]/90 border border-white/[0.05] hover:border-white/[0.12] transition-all duration-200 cursor-pointer ${
                  task.completed ? 'opacity-65' : ''
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  {/* Custom Checkbox */}
                  <div
                    className={`w-4 h-4 rounded-[5px] flex items-center justify-center transition-all shrink-0 ${
                      task.completed
                        ? 'bg-[#E85D68] text-white shadow-[0_0_8px_rgba(232,93,104,0.4)]'
                        : 'border border-white/[0.25] group-hover:border-white/[0.5] bg-transparent'
                    }`}
                  >
                    {task.completed && <Check strokeWidth={3} className="w-2.5 h-2.5" />}
                  </div>

                  {/* Task Text */}
                  <span
                    className={`text-[12.5px] truncate transition-all ${
                      task.completed
                        ? 'line-through text-[#6B7280]'
                        : 'text-[#F3F4F6] group-hover:text-white'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] text-[#6B7280] font-mono">
                    {task.tag}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTask(task.id);
                    }}
                    aria-label={`Delete task ${task.text}`}
                    className="p-1 rounded text-[#6B7280] hover:text-[#E85D68] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-2 text-[11px] text-[#6B7280] flex justify-between border-t border-white/[0.04]">
        <span>Coral Rose Checkpoints</span>
        <span>{tasks.filter((t) => !t.completed).length} pending</span>
      </div>
    </div>
  );
};
