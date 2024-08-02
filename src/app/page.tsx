import PostList from '@/components/posts/post-list';
import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';
import { fetchTopPosts } from '@/db/queries/posts';

export default async function Home() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl my-4">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="flex flex-col items-end">
        <TopicCreateForm />
        <TopicList />
      </div>
    </div>
  );
}
