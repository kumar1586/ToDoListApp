"use client"

import type { Todo } from "@/app/page"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  // Sort todos by creation date (newest first) and completion status
  const sortedTodos = [...todos].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    // Then sort by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No tasks yet. Add your first task to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {sortedTodos.map((todo) => (
        <Card key={todo.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 flex-1">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => onToggle(todo.id)}
                  className="mt-1"
                />
                <div className="space-y-1 flex-1">
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={cn(
                      "font-medium cursor-pointer block",
                      todo.completed && "line-through text-muted-foreground",
                    )}
                  >
                    {todo.title}
                  </label>
                  <p className="text-xs text-muted-foreground">{format(todo.createdAt, "MMM d, yyyy 'at' h:mm a")}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(todo.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

