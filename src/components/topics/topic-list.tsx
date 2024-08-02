import { db } from '@/db';
import { paths } from '@/paths';
import Link from 'next/link';
import { Badge } from '../ui/badge';

export default async function TopicList() {
  const topics = await db.topic.findMany();

  return (
    <div className="w-full flex flex-wrap gap-2 my-2">
      {topics.map((topic) => (
        <div key={topic.id}>
          <Link href={paths.topicShow(topic.slug)}>
            <Badge variant="outline">{topic.slug}</Badge>
          </Link>
        </div>
      ))}
    </div>
  );
}
