import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import PostShow from '@/components/posts/post-show';
import { Skeleton } from '@/components/ui/skeleton';
import { paths } from '@/paths';
import { ArrowLeftCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

interface Props {
  params: {
    slug: string;
    postId: string;
  };
}
export default function Page({ params }: Props) {
  const { slug, postId } = params;

  return (
    <div className="flex flex-col">
      <Link
        className="underline w-full flex flex-row gap-2 capitalize"
        href={paths.topicShow(slug)}
      >
        <ArrowLeftCircleIcon />
        Back to {slug}
      </Link>
      <Suspense
        fallback=<Skeleton className="m-4 w-[100px] h-[20px] rounded-full" />
      >
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} />
      <CommentList postId={postId} />
    </div>
  );
}
