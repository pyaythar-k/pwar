'use client';

import { SignIn, SignOut } from '@/actions';
import { useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import Image from 'next/image';
import { CircleUser } from 'lucide-react';

export default function HeaderAuth() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {session.data?.user ? (
            <Image
              src={session.data?.user.image || 'https://i.pravatar.cc/300'}
              alt="profile"
              width={32}
              height={32}
              className="rounded-3xl"
            />
          ) : (
            <CircleUser className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session.data?.user ? (
          <DropdownMenuItem asChild>
            <form action={SignOut}>
              <button type="submit" className="w-full">
                Sign Out
              </button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <form action={SignIn}>
              <button type="submit" className="w-full">
                Sign In
              </button>
            </form>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
