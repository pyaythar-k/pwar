import { PostWithData } from '@/db/queries/posts';
import { paths } from '@/paths';
import Link from 'next/link';

interface Props {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: Props) {
  const posts = await fetchData();
  console.log(posts.length);

  return (
    <>
      {posts.map((post) => {
        const topicSlug = post.topic.slug;
        return (
          <div key={post.id} className="border rounded p-2 my-4">
            <Link href={paths.postShow(topicSlug, post.id)}>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <div className="flex flex-row gap-8">
                <p className="text-xs text-gray-400">By {post.user.name}</p>
                <p className="text-xs text-gray-400">
                  {post._count.comments} comments
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
