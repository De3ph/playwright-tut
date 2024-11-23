import { createColumnHelper } from "@tanstack/react-table"
import { makeAutoObservable, toJS } from "mobx"

class TodoStore {
  _todos = [
    { id: 1, task: "Learn React", completed: false },
    { id: 2, task: "Build Todo App", completed: true },
    { id: 3, task: "Master TanStack Table", completed: false }
  ]
  columnHelper = createColumnHelper()
  newTask = ""

  columns = [
    this.columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue()
    }),
    this.columnHelper.accessor("task", {
      header: "Task",
      cell: (info) => info.getValue()
    }),
    this.columnHelper.accessor("completed", {
      header: "Status",
      cell: (info) => (info.getValue() ? "Completed" : "Pending")
    }),
    this.columnHelper.accessor("actions", {
      header: "Actions",
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <button
            onClick={() => this.toggleTodo(row.original.id)}
            className='px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Toggle
          </button>
          <button
            onClick={() => this.deleteTodo(row.original.id)}
            className='px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600'
          >
            Delete
          </button>
        </div>
      )
    })
  ]
  constructor() {
    makeAutoObservable(this)
  }

  setNewTask = (newTask) => {
    this.newTask = newTask
  }

  addTodo = () => {
    if (this.newTask.trim() === "") {
      return
    }

    this._todos.push({
      id: this._todos.length
        ? Math.max(...this._todos.map((t) => t.id)) + 1
        : 1,
      task: this.newTask,
      completed: false
    })
    this.setNewTask("")
    console.log("🚀 ~ TodoStore ~ this._todos:", this._todos)
  }

  toggleTodo(id) {
    this._todos = this._todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }

  deleteTodo(id) {
    this._todos = this._todos.filter((todo) => todo.id !== id)
  }

  get todos() {
    return toJS(this._todos)
  }
}

export default new TodoStore()
