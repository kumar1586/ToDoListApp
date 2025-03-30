"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TodoList } from "@/components/todo-list"
import { NoteList } from "@/components/note-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddTodoDialog } from "@/components/add-todo-dialog"
import { AddNoteDialog } from "@/components/add-note-dialog"

export type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

export type Note = {
  id: string
  title: string
  content: string
  createdAt: Date
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [todoDialogOpen, setTodoDialogOpen] = useState(false)
  const [noteDialogOpen, setNoteDialogOpen] = useState(false)

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    const savedNotes = localStorage.getItem("notes")

    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos)
        // Convert string dates back to Date objects
        setTodos(
          parsedTodos.map((todo: any) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
          })),
        )
      } catch (e) {
        console.error("Failed to parse todos", e)
      }
    }

    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes)
        // Convert string dates back to Date objects
        setNotes(
          parsedNotes.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
          })),
        )
      } catch (e) {
        console.error("Failed to parse notes", e)
      }
    }
  }, [])

  // Save to localStorage whenever todos or notes change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date(),
    }
    setNotes([...notes, newNote])
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, title, content } : note)))
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center my-8">Task & Note Manager</h1>

      <Tabs defaultValue="todos" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="todos">Tasks</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="mt-0">
            <Button
              onClick={() => setTodoDialogOpen(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              New Task
            </Button>
          </TabsContent>

          <TabsContent value="notes" className="mt-0">
            <Button
              onClick={() => setNoteDialogOpen(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              New Note
            </Button>
          </TabsContent>
        </div>

        <TabsContent value="todos" className="mt-2">
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </TabsContent>

        <TabsContent value="notes" className="mt-2">
          <NoteList notes={notes} onDelete={deleteNote} onUpdate={updateNote} />
        </TabsContent>
      </Tabs>

      <AddTodoDialog open={todoDialogOpen} onOpenChange={setTodoDialogOpen} onAdd={addTodo} />

      <AddNoteDialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen} onAdd={addNote} />
    </main>
  )
}

