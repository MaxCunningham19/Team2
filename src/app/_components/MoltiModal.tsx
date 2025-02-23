"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function MoltiModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [totalAmount, setTotalAmount] = useState("")
  const [description, setDescription] = useState("")
  const [milestone1, setMilestone1] = useState("")
  const [milestone2, setMilestone2] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Molti form submitted:", { totalAmount, description, milestone1, milestone2 })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Molti Commission Details</DialogTitle>
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
            <Label htmlFor="milestone1">Milestone 1</Label>
            <Input
              id="milestone1"
              value={milestone1}
              onChange={(e) => setMilestone1(e.target.value)}
              placeholder="Enter first milestone"
            />
          </div>
          <div>
            <Label htmlFor="milestone2">Milestone 2</Label>
            <Input
              id="milestone2"
              value={milestone2}
              onChange={(e) => setMilestone2(e.target.value)}
              placeholder="Enter second milestone"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

