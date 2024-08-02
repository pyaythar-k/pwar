import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Input } from './ui/input';

import { Button } from './ui/button';
import { CircleUser, Menu, Package2, Search } from 'lucide-react';
import HeaderAuth from './header-auth';
import { paths } from '@/paths';
import SearchInput from './search-input';
import { Suspense } from 'react';

export default async function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-surfaceColor px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <span>Pwar</span>
          <span className="sr-only">Pwar</span>
        </Link>
        <Link href="/" className="flex items-center gap-2">
          Home
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span>Pwar</span>
              <span className="sr-only">Pwar</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              Home
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>
      <HeaderAuth />
    </header>
  );
}
