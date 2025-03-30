"use client"

import { useState } from "react"
import type { Note } from "@/app/page"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from "lucide-react"
import { format } from "date-fns"
import { EditNoteDialog } from "./edit-note-dialog"

interface NoteListProps {
  notes: Note[]
  onDelete: (id: string) => void
  onUpdate: (id: string, title: string, content: string) => void
}

export function NoteList({ notes, onDelete, onUpdate }: NoteListProps) {
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  // Sort notes by creation date (newest first)
  const sortedNotes = [...notes].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  if (notes.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No notes yet. Add your first note to get started!</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedNotes.map((note) => (
          <Card key={note.id} className="overflow-hidden transition-all hover:shadow-md flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 flex-1">
              <p className="whitespace-pre-wrap text-sm">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground border-t">
              <span>{format(note.createdAt, "MMM d, yyyy")}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => setEditingNote(note)} className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(note.id)}
                  className="h-8 w-8 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {editingNote && (
        <EditNoteDialog
          note={editingNote}
          open={!!editingNote}
          onOpenChange={(open) => {
            if (!open) setEditingNote(null)
          }}
          onUpdate={(title, content) => {
            if (editingNote) {
              onUpdate(editingNote.id, title, content)
              setEditingNote(null)
            }
          }}
        />
      )}
    </>
  )
}

