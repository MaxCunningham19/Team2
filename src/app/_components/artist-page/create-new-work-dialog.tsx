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
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useTransition } from "react"
import { createClient } from "@/utils/supabase/client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { convertBlobUrlToFile } from "~/lib/utils"
import { uploadImage } from "~/utils/supabase/storage/client"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  desc: z.optional(z.string()),
  quantity: z.optional(z.coerce.number().min(1)),
  imageUrl: z.string(),
})

export function CreateNewWorkDialog({ artistId }: { artistId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const id = artistId

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClient();
    const { title, desc, quantity, imageUrl } = values;

    const { error } = await supabase.from("works").insert([
      {
        artist_id: id,
        title: title,
        desc: desc,
        quantity: quantity,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      console.error("Error inserting work:", error);
    } else {
      console.log("Work created successfully!");
    }
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

  async function handleUpload() {
    startTransition(async () => {
      const imageFile = await convertBlobUrlToFile(imageUrl);

      const { imageUrl: uploadedImageUrl, error } = await uploadImage({
        file: imageFile,
        bucket: "assets",
      });

      console.log("uploaded")


      if (error) {
        console.error(error);
        return;
      }

      console.log(uploadedImageUrl)

      form.setValue("imageUrl", uploadedImageUrl)
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
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[80vh]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary-foreground">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title of work" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary-foreground">Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description of work" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary-foreground">Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="1" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-secondary-foreground">Upload Image</FormLabel>
                    <Input id="picture" type="file" onChange={handleFileChange} />
                    {imageUrl && <Image src={imageUrl} alt="Selected image" width={200} height={200} />}
                    <Button onClick={handleUpload} disabled={!imageUrl || isPending}>Upload</Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
