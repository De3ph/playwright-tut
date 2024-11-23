// App.jsx
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { observer } from "mobx-react-lite"

import store from "./store"

const App = observer(() => {
  const { newTask, setNewTask, addTodo } = store

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>Todo List</h1>

        <form onSubmit={addTodo} className='mb-8 flex gap-4'>
          <input
            data-testid='input'
            type='text'
            value={newTask}
            onChange={setNewTask}
            placeholder='Enter new task...'
            className='flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            data-testid='submitBtn'
            type='submit'
            className='px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Add Todo
          </button>
        </form>

        <Table store={store} />
      </div>
    </div>
  )
})

const Table = observer(({ store: { todos, columns } }) => {
  const table = useReactTable({
    data: todos,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <div className='bg-white rounded-lg shadow overflow-hidden'>
      <table
        className='min-w-full divide-y divide-gray-200'
        data-testid='table'
      >
        <thead className='bg-gray-50'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {table.getRowModel().rows.map((row) => (
            <TableRow row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
})

const TableRow = ({ row }) => {
  return (
    <tr key={row.id} className={row.original?.completed ? "bg-green-100" : ""}>
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}

export default App
