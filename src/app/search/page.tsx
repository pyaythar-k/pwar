import PostList from '@/components/posts/post-list';
import { fetchPostsbySearchTerm } from '@/db/queries/posts';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    term: string;
  };
}

export default function Page({ searchParams }: Props) {
  const { term } = searchParams;

  if (!term) {
    redirect('/');
  }

  return (
    <div>
      <h1 className="text-3xl my-4 capitalize">
        Search Results for <span className="underline">{term}</span>
      </h1>
      <PostList fetchData={() => fetchPostsbySearchTerm(term)} />
    </div>
  );
}
