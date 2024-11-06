'use client'

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import Image from 'next/image'
import TodoItem from './TodoItem'
import { useState } from 'react'

export type Todo = {
  id: number
  name: string
  completed: boolean
}

const todosList: Todo[] = [
  {
    id: 1,
    name: 'Todo 1',
    completed: false,
  },
  {
    id: 2,
    name: 'Todo 2',
    completed: false,
  },
  {
    id: 3,
    name: 'Todo 3',
    completed: false,
  },
  {
    id: 4,
    name: 'Todo 4',
    completed: false,
  },
  {
    id: 5,
    name: 'Todo 5',
    completed: false,
  },
  {
    id: 6,
    name: 'Todo 6',
    completed: false,
  },
]

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(todosList)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01,
      },
    })
  )

  const toggleTodo = (id: number): void => {
    setTodos(prevTodos => {
      return todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    })
  }

  const handleDragStart = (e: DragStartEvent): void => {
    console.log('drag started')
  }

  const handleDragOver = (e: DragOverEvent): void => {
    console.log('drag over')
  }

  const handleDragEnd = (e: DragEndEvent) => {
    console.log('drag end')
    const { active, over } = e

    if (!active || !over) return

    setTodos(prevTodos => {
      const activeTodoIndex = prevTodos.findIndex(t => t.id === active.id)
      const overTodoIndex = prevTodos.findIndex(t => t.id === over.id)
      return arrayMove(todos, activeTodoIndex, overTodoIndex)
    })
  }
  return (
    <>
      {/* DndContext is the main element within the elements will be draggable */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* SortableContext allows items within to be draggable. Multi container sorting between containers is also possible, but a lot more complex code. Here you need to give a mapped version of the items (todos) containing only uniqiue identifiers (IDs)*/}
        <SortableContext items={todos.map(t => t.id)}>
          <div className='flex flex-col gap-8 mx-8 my-8'>
            <div className='flex flex-col gap-2'>
              <span>Drag black box of todo to change order</span>
              <span>Click on todo text to toggle completed status</span>
            </div>
            {todos.map(t => (
              <TodoItem key={t.id} todo={t} toggleTodo={toggleTodo}></TodoItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  )
}
