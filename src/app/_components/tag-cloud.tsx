"use client"

import { useState, useEffect, useMemo } from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Badge } from "@/components/ui/badge"

interface TagProps {
  id: string
  label: string
  color: string
}

function Tag({ id, label, color }: TagProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    backgroundColor: color,
    color: getContrastColor(color),
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="m-1 cursor-move">
      <Badge variant="secondary" className="rounded-none">
        {label}
      </Badge>
    </div>
  )
}

const artStyleTags = [
  "Abstract",
  "Impressionist",
  "Surrealist",
  "Minimalist",
  "Pop Art",
  "Cubist",
  "Art Nouveau",
  "Baroque",
  "Renaissance",
  "Gothic",
  "Expressionist",
  "Realist",
  "Futurist",
  "Art Deco",
  "Rococo",
  "Romantic",
  "Neoclassical",
  "Modernist",
  "Post-Impressionist",
  "Symbolist",
]

const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F06292",
  "#AED581",
  "#7986CB",
  "#4DB6AC",
  "#FFF176",
  "#FFB74D",
  "#A1887F",
  "#90A4AE",
  "#9575CD",
  "#4DD0E1",
  "#81C784",
  "#DCE775",
  "#FFD54F",
  "#FF8A65",
  "#BA68C8",
]

function getContrastColor(hexColor: string) {
  // Convert hex to RGB
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

export function TagCloud() {
  const [tags, setTags] = useState<TagProps[]>([])

  const shuffledColors = useMemo(() => [...colors].sort(() => Math.random() - 0.5), [])

  useEffect(() => {
    // Shuffle tags and assign colors
    const shuffledTags = [...artStyleTags]
      .sort(() => Math.random() - 0.5)
      .map((tag, index) => ({
        id: tag,
        label: tag,
        color: shuffledColors[index % shuffledColors.length] || "#FFFFFF",
      }))
    setTags(shuffledTags)
  }, [shuffledColors])

  return (
    <div className="flex flex-wrap justify-center p-4 bg-muted rounded-lg">
      {tags.map((tag) => (
        <Tag key={tag.id} {...tag} />
      ))}
    </div>
  )
}

