"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Note } from "@/app/page"

interface EditNoteDialogProps {
  note: Note
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (title: string, content: string) => void
}

export function EditNoteDialog({ note, open, onOpenChange, onUpdate }: EditNoteDialogProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  // Update state when note changes
  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [note])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onUpdate(title.trim(), content.trim())
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-note-title">Title</Label>
              <Input
                id="edit-note-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-note-content">Content</Label>
              <Textarea
                id="edit-note-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

