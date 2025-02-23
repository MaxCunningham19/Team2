"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { convertBlobUrlToFile } from "@/lib/utils"
import { uploadImage } from "@/utils/supabase/storage/client"
import { useState, useTransition } from "react"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "~/lib/utils"
import { Calendar } from "../ui/calendar"
import { Checkbox } from "../ui/checkbox"
import Image from "next/image"

const formSchema = z.object({
  workTitle: z.string().min(2, {
    message: "Work title must be at least 2 characters.",
  }),
  workDate: z.optional(z.date()),
  price: z.optional(z.coerce.number()),
  onSale: z.boolean(),
  workDescription: z.optional(z.string()),
  imageUrl: z.string(),
})

export const CreateNewWorkDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // INSERT API UPDATE HERE :)
    console.log("Hello, world!")
    console.log(values)
  }

  const [imageUrl, setImageUrl] = useState<string>("")
  const [isPending, startTransition] = useTransition()

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  // TODO: Change this to a tRPC mutation that does this shit on the server side
  async function handleUpload() {
    startTransition(async () => {
      const imageFile = await convertBlobUrlToFile(imageUrl);

      const { imageUrl: uploadedImageUrl, error } = await uploadImage({
        file: imageFile,
        bucket: "assets",
      });

      console.log(uploadedImageUrl);
      form.setValue("imageUrl", uploadedImageUrl)

      if (error) {
        console.error(error);
        return;
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create New Work
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Work</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                  control={form.control}
                  name="workTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary-foreground">Work Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Mona Lisa" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the title of your work.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-secondary-foreground">Date of Work</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary-foreground">Upload Image of Work</FormLabel>
                      <Input id="picture" type="file" onChange={handleFileChange} />
                      {imageUrl && <Image src={imageUrl} alt="Selected image" width={200} height={200} />}
                      <FormControl>
                        <Button onClick={handleUpload} disabled={!imageUrl || isPending}>Upload</Button>
                      </FormControl>
                      <FormDescription>
                        A photograph of your work; can be a digital scan, high quality photo, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary-foreground">Price of Work</FormLabel>
                      <FormControl>
                        <Input placeholder="400" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        The price of your work, in euros.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="onSale"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-secondary-foreground">For Sale</FormLabel>
                        <FormDescription>
                          Is this work available for purchase?
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary-foreground">Description</FormLabel>
                      <FormControl>
                        <Input placeholder="This artwork evokes imagery of... Inspired by..." type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
