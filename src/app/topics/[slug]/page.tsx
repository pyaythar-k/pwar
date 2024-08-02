import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostsbyTopicSlug } from '@/db/queries/posts';

interface Props {
  params: {
    slug: string;
  };
}

export default function Page({ params }: Props) {
  const { slug } = params;
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl my-4 capitalize">
          All Posts About <span className="underline">{slug}</span>
        </h1>
        <PostList fetchData={() => fetchPostsbyTopicSlug(slug)} />
      </div>
      <div className="flex flex-col items-end">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
