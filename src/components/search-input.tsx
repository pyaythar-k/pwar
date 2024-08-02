'use client';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useSearchParams } from 'next/navigation';
import { search } from '@/actions';

export default function SearchInput() {
  const searchParams = useSearchParams();

  const term = searchParams.get('term') || '';

  return (
    <form className="ml-auto flex-1 sm:flex-initial" action={search}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          name="term"
          type="search"
          defaultValue={term}
          placeholder="Search products..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>
    </form>
  );
}
