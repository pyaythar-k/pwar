import { db } from '@/db';
import { notFound } from 'next/navigation';

interface Props {
  postId: string;
}

export default async function PostShow({ postId }: Props) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const post = await db.post.findFirst({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold my-4">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
