import { Todo } from '@/model/quadro/todo'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Item from './Item'

type Props = {
  nome: string;
  droppableId: string
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function Coluna({ nome, droppableId, todos, setTodos }: Props) {
  return (
    <Droppable droppableId={droppableId}>
      {
        (droppableProvided) => (
          <div className='bg-gray-400 px-5 py-3 rounded-md'
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            <span className='text-white text-2xl font-semibold'>
              {nome}
            </span>
            {todos.map((todo, index) =>
              <Item index={index} key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
            )}
          </div>
        )}
    </Droppable>

  )

}
