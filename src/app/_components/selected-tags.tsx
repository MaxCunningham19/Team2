"use client"

import { useDroppable } from "@dnd-kit/core"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface SelectedTagsProps {
  selectedTags: string[]
  onRemoveTag: (tag: string) => void
}

export function SelectedTags({ selectedTags, onRemoveTag }: SelectedTagsProps) {
  const { setNodeRef } = useDroppable({
    id: "selected-tags",
  })

  return (
    <div
      ref={setNodeRef}
      className="min-h-[100px] p-4 bg-muted rounded-lg border-2 border-dashed border-primary-foreground"
    >
      {selectedTags.length === 0 ? (
        <p className="text-center text-muted-foreground">Drag and drop tags here</p>
      ) : (
        selectedTags.map((tag) => (
          <Badge key={tag} variant="default" className="m-1">
            {tag}
            <button className="ml-1 hover:text-destructive" onClick={() => onRemoveTag(tag)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))
      )}
    </div>
  )
}

