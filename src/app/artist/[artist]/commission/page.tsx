"use client";
import { useParams } from 'next/navigation';
import { createClient } from '~/utils/supabase/client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewCommission() {
    // artist id from the url
    const { artist } = useParams();
    const supabase = createClient();

    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState('');
    
    async function createCommission() {
        const { data, error } = await supabase.from('commissions').insert([
            {
                artist_id: artist,
                price,
                desc,
            }
        ]);
        if (error) {
            console.error('Error creating commission:', error.message);
        } else {
            console.log('Commission created:', data);
        }
    }

    return (
        <Card className="p-4 w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Create a New Commission for {artist}</CardTitle>
                <CardDescription>Enter the details of your commission below.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <label className="block mb-1">Description:</label>
                    <Textarea 
                        className="w-full" 
                        value={desc} 
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Enter commission details"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Price:</label>
                    <Input 
                        type="number" 
                        className="w-full" 
                        defaultValue={price} 
                        onChange={(e) => setPrice(Number(e.target.value))}
                        min="0"
                    />
                </div>
                <Button 
                    className="w-full" 
                    onClick={createCommission}
                >
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
}
