"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function MetaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [totalAmount, setTotalAmount] = useState("")
  const [description, setDescription] = useState("")
  const [milestone, setMilestone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Meta form submitted:", { totalAmount, description, milestone })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Metà Commission Details</DialogTitle>
          <DialogDescription>Please fill in the details for your commission.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="totalAmount">Total Amount</Label>
            <Input
              id="totalAmount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="Enter total amount"
            />
          </div>
          <div>
            <Label htmlFor="description">Description of Commission</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your commission"
            />
          </div>
          <div>
            <Label htmlFor="milestone">Milestone</Label>
            <Input
              id="milestone"
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
              placeholder="Enter milestone"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

