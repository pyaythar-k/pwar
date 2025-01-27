'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { paths } from '@/paths';
import { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

// create zod schema
const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // apply zod schema and validate
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!result.success) {
    // combine error messages
    return { errors: result.error.flatten().fieldErrors };
  }

  // get session
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be logged in to create a post'],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ['Topic not found'],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id!,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['An unexpected error occurred while creating the topic'],
        },
      };
    }
  }

  revalidatePath(paths.topicShow(topic.slug));
  redirect(paths.postShow(slug, post.id));
}
