'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AdminNav() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/admin" className="text-white hover:text-gray-300">
            Add Plant
          </Link>
          <Link href="/admin/plants" className="text-white hover:text-gray-300">
            Plants
          </Link>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/signin' })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}