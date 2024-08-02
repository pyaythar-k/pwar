'use server';
import { auth } from '@/auth';
import { db } from '@/db';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { Topic } from '@prisma/client';
import { paths } from '@/paths';
import { revalidatePath } from 'next/cache';

interface CreateToipcProps {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

// create zod schema
const createToipcSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters or dashes without special characters',
    }),
  description: z.string().min(10),
});
export async function createTopic(
  formState: CreateToipcProps,
  formData: FormData
): Promise<CreateToipcProps> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //apply zod schema and validate
  const result = createToipcSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });
  console.log(result);

  if (!result.success) {
    // combine error messages
    console.log(result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be logged in to create a topic'],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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

  revalidatePath('/');
  redirect(paths.topicShow(topic.slug));
}
