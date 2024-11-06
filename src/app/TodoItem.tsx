'use client'

import { useSortable } from '@dnd-kit/sortable'
import { Todo } from './page'
import { CSS } from '@dnd-kit/utilities'

type Props = {
  todo: Todo
  toggleTodo: (id: number) => void
}

export default function TodoItem({ todo, toggleTodo }: Props) {
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    data: {
      todo,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <>
      {/* Giving an element the ref and style will make it the draggable item */}
      <div
        className='flex items-center gap-4 border border-1 border-black w-fit px-4 py-2 rounded-lg'
        ref={setNodeRef}
        style={style}
      >
        {/* Drag handle is set by giving it the listeners and attributes */}
        <div
          {...listeners}
          {...attributes}
          className='w-8 h-8 bg-gray-800 cursor-grab'
        ></div>
        <div
          onClick={() => toggleTodo(todo.id)}
          className='flex flex-col gap-1 cursor-pointer'
        >
          <span>{`Id: ${todo.id}`}</span>
          <span>{`Name: ${todo.name}`}</span>
          <span>{`Completed: ${todo.completed}`}</span>
        </div>
      </div>
    </>
  )
}
