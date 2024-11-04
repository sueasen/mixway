'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import {
  fetchMixwayApiStation,
  fetchNominatimApi,
} from '@/app/functions/actions';
import Navbar from '@/app/components/navbar';

export default function Station() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [result, setResult] = useState<string | null>(null);

  const handleChange = useDebouncedCallback((text: string) => {
    console.log(text);
    const params = new URLSearchParams(searchParams);
    // text があれば query に設定, 無ければ初期化
    if (text) {
      params.set('name', text);
    } else {
      params.delete('name');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleSerchMixway = async (text: string | undefined) => {
    serchApi(text, fetchMixwayApiStation);
  };

  const handleSerchNominati = async (text: string | undefined) => {
    serchApi(text, fetchNominatimApi);
  };

  const serchApi = async (
    text: string | undefined,
    fetchApi: (text: string) => Promise<unknown>
  ) => {
    console.log(text);
    setResult('Loading...');
    const json = await fetchApi(text || '');
    setResult(JSON.stringify(json, null, 2));
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main className="flex flex-col justify-items-center sm:items-start max-w-lg">
        <Navbar />
        <h1 className="text-2xl">駅情報</h1>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-2">
          <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="駅名"
              onChange={(e) => handleChange(e.target.value)}
              defaultValue={searchParams.get('name')?.toString()}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <button
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() =>
              handleSerchMixway(searchParams.get('name')?.toString())
            }
          >
            <MagnifyingGlassIcon className="h-5" />
            <span className="hidden md:block">Serch Mixway</span>
          </button>
          <button
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() =>
              handleSerchNominati(searchParams.get('name')?.toString())
            }
          >
            <MagnifyingGlassIcon className="h-5" />
            <span className="hidden md:block">Serch Nominati</span>
          </button>
        </div>
        <pre className="bg-gray-200 w-full h-60 overflow-auto mt-2 p-3 rounded-md">
          {result}
        </pre>
      </main>
    </div>
  );
}
