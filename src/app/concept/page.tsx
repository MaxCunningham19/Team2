"use client"

import React, { useState, useTransition } from "react"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaintbrushIcon as PaintBrush, Loader2 } from "lucide-react"
import { TagCloud } from "@/components/tag-cloud"
import { SelectedTags } from "@/components/selected-tags"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { convertBlobUrlToFile } from "@/lib/utils"
import { uploadImage } from "@/utils/supabase/storage/client"

export default function Dashboard() {
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [directImageLinks, setDirectImageLinks] = useState<string[]>([""])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [resultData, setResultData] = useState<{ colors: string[]; description: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files))
    }
  }

  const handleDirectLinkChange = (index: number, value: string) => {
    setDirectImageLinks((prev) =>
      prev.map((link, i) => (i === index ? value : link))
    )
  }

  const addDirectLinkBox = () => {
    setDirectImageLinks((prev) => [...prev, ""])
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "selected-tags") {
      const draggedTag = event.active.id as string
      if (!selectedTags.includes(draggedTag)) {
        setSelectedTags([...selectedTags, draggedTag])
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUploading(true)
    try {
      // Upload images concurrently
      const uploadedUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const tempUrl = URL.createObjectURL(file)
          const imageFile = await convertBlobUrlToFile(tempUrl)
          const { imageUrl: uploadedImageUrl, error } = await uploadImage({
            file: imageFile,
            bucket: "assets",
          })
          if (error) {
            console.error("Upload error:", error)
            return ""
          }
          return uploadedImageUrl
        })
      )
      const validUploadedUrls = uploadedUrls.filter((url) => url)

      // Process direct image links from the array
      const validDirectUrls = directImageLinks
        .map((link) => link.trim())
        .filter((link) => link.length > 0)

      // Combine both sets of image URLs
      const allImageUrls = [...validUploadedUrls, ...validDirectUrls]

      // Construct the prompt with additional instructions for multiple short sections with headings.
      const promptText = `Creative Brief (Structured JSON Output Required):
Description: ${description}
Tags: ${selectedTags.join(", ")}
Image URLs: ${allImageUrls.join(", ")}
Instructions:
1. Analyze the art styles present in these images.
2. In one short section titled "Scene Analysis", briefly describe what is happening in the images.
3. In another short section titled "Artistic Techniques", list the techniques you observe (e.g., brushwork, composition, color balance).
4. In a section titled "Mood & Atmosphere", describe the overall mood conveyed.
5. Finally, suggest a set of hex colour codes in a section titled "Suggested Colour Palette" that fit the overall theme.
Return the output as JSON in the following format:
{
  "colors": [ "#HEX1", "#HEX2", ... ],
  "description": "Combine your Scene Analysis, Artistic Techniques, and Mood & Atmosphere insights into a concise creative brief."
}`

      // Call the server endpoint
      const response = await fetch("/api/generate-art-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          max_tokens: 200,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate text")
      }
      const data = await response.json()
      const cleanedText = data.text
        .replace(/```json\s*/i, "")
        .replace(/```/g, "")
        .trim()
      try {
        const parsed = JSON.parse(cleanedText)
        setResultData(parsed)
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError)
      }
    } catch (error) {
      console.error("Error during image upload or submission:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container mx-auto p-4 m-40 bg-gray-100 rounded-lg">
        <div className="grid gap-2 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Creative Input & Analysis</CardTitle>
              <CardDescription>
                Upload images, provide descriptions, and select tags to generate a comprehensive creative brief for artists.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="image-upload">Upload Images</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>
                <div>
                  <Label>Direct Image Links</Label>
                  {directImageLinks.map((link, index) => (
                    <div key={index} className="mb-2">
                      <Input
                        type="text"
                        placeholder="Enter image URL"
                        value={link}
                        onChange={(e) =>
                          handleDirectLinkChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <Button variant="outline" onClick={addDirectLinkBox}>
                    Add Another Link
                  </Button>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your vision..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Art Style Tags</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag tags from below and drop them in the box
                  </p>
                  <TagCloud />
                </div>
                <div>
                  <Label>Selected Tags</Label>
                  <SelectedTags selectedTags={selectedTags} onRemoveTag={removeTag} />
                </div>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <PaintBrush className="mr-2 h-4 w-4" />
                      Generate Concept
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Concept Generation</CardTitle>
              </CardHeader>
              <CardContent>
                {resultData ? (
                  <div className="space-y-4">
                    <div className="prose">
                      <ReactMarkdown>{resultData.description}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Your generated concept will appear here.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested Colour Palette</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-2">
                {resultData?.colors.map((color: string, index: number) => (
                  <div
                    key={index}
                    className="w-full h-32 flex flex-col items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-xs text-white">{color}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Artist Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Artist recommendations will appear here based on the generated concept.
              </p>
              {/* Add artist matching logic and display here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </DndContext>
  )
}
