import supabase from "../../database/bucket";
import prisma from "../../database/db";
import * as fs from 'node:fs'
import path from 'node:path'

interface Props {
    content: string;
    bookId: string;
    title: string;
    userId: string;
    name: string
}

export default async function createReviewService({ bookId, content, title, userId, name }: Props) {
    const bucket = await supabase.storage.getBucket('reviews');
    if (!bucket.data) {
        await supabase.storage.createBucket('reviews', {
            public: false,
            allowedMimeTypes: ['text/markdown'],
            fileSizeLimit: 10240,
        });
    }
    
    await fs.appendFile(`./${bookId}.md`, content, ()=>{
    });

    const file = fs.readFileSync(`./${bookId}.md`)
    
    await supabase.storage.from('reviews').upload(`${title} - ${name}`, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'text/markdown',
    });
    
    fs.rmSync(`./${bookId}.md`);
    const review = await prisma.review.create({ data: {
        title,
        userId,
        bookId,
    }});
    
    return { ...review, id: undefined, userId: undefined };

}