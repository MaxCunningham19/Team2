"use client";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useTransition } from "react"
import Image from "next/image"
import { convertBlobUrlToFile } from "@/lib/utils"
import { uploadImage } from "@/utils/supabase/storage/client"
import { Button } from "../_components/ui/button";

export default function InputFile() {
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

            console.log(uploadedImageUrl);

            if (error) {
                console.error(error);
                return;
            }
        });
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" onChange={handleFileChange} />
            {imageUrl && <Image src={imageUrl} alt="Selected image" width={200} height={200} />}
            <Button onClick={handleUpload} disabled={!imageUrl || isPending}>Upload</Button>
        </div>
    )
}