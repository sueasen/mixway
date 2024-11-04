'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  fetchNominatimApi,
  fetchMixwayApiCourse,
} from '@/app/functions/actions';
import { LatLng } from '@/app/functions/types';
import { toStringLatLng } from '@/app/functions/utils';
import Navbar from '@/app/components/navbar';

// import Link from 'next/link';

export default function Station() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [start, setStart] = useState<LatLng>({ lat: '', lng: '' });
  const [resultStart, setResultStart] = useState<string>('');
  const [end, setEnd] = useState<LatLng>({ lat: '', lng: '' });
  const [resultEnd, setResultEnd] = useState<string>('');
  const [resultCorse, setResultCorse] = useState<string>('');

  const handleChange = useDebouncedCallback((name: string, text: string) => {
    console.log(name + ':' + text);
    const params = new URLSearchParams(searchParams);
    // text があれば query に設定, 無ければ初期化
    if (text) {
      params.set(name, text);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const serchLatLng = async (
    text: string | undefined,
    setResult: React.Dispatch<React.SetStateAction<string>>,
    setLatLng: React.Dispatch<React.SetStateAction<LatLng>>
  ) => {
    console.log(text);
    if (!text) {
      setResult('');
      setLatLng({ lat: '', lng: '' });
      return;
    }
    setResult('Loading...');
    const json = await fetchNominatimApi(text);
    console.log(json);
    setResult(JSON.stringify(json, null, 2));
    if (json.length > 0) setLatLng({ lat: json[0].lat, lng: json[0].lon });
  };

  const handleSerchStartLatLng = async (text: string | undefined) => {
    serchLatLng(text, setResultStart, setStart);
  };

  const handleSerchEndLatLng = async (text: string | undefined) => {
    serchLatLng(text, setResultEnd, setEnd);
  };

  const handleSerchMixwayCorse = async () => {
    if (!start.lat || !end.lat) {
      setResultCorse('start or end is empty');
      return;
    }
    setResultCorse('Loading...');
    const json = await fetchMixwayApiCourse([start, end]);
    console.log(json);
    setResultCorse(JSON.stringify(json, null, 2));
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main className="flex flex-col justify-items-center sm:items-start max-w-lg">
        <Navbar />
        <h1 className="text-2xl">経路探索</h1>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-2">
          <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="start" className="flex items-center mr-3">
              Start
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
              placeholder="start"
              onChange={(e) => handleChange('start', e.target.value)}
              defaultValue={searchParams.get('start')?.toString()}
            />
          </div>
          <button
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() =>
              handleSerchStartLatLng(searchParams.get('start')?.toString())
            }
          >
            <span className="hidden md:block">latlng</span>
          </button>
          <pre className="bg-gray-200 flex items-center p-2 w-56 rounded-md">
            {toStringLatLng(start)}
          </pre>
        </div>
        <pre className="bg-gray-200 w-full h-20 overflow-auto mt-2 p-3 rounded-md">
          {resultStart}
        </pre>

        <div className="mt-4 flex items-center justify-between gap-2 md:mt-2">
          <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="end" className="flex items-center mr-3">
              End
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
              placeholder="end"
              onChange={(e) => handleChange('end', e.target.value)}
              defaultValue={searchParams.get('end')?.toString()}
            />
          </div>
          <button
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() =>
              handleSerchEndLatLng(searchParams.get('end')?.toString())
            }
          >
            <span className="hidden md:block">latlng</span>
          </button>
          <pre className="bg-gray-200 flex items-center p-2 w-56 rounded-md">
            {toStringLatLng(end)}
          </pre>
        </div>
        <pre className="bg-gray-200 w-full h-20 overflow-auto mt-2 p-3 rounded-md">
          {resultEnd}
        </pre>

        <button
          className="flex mt-2 h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={() => handleSerchMixwayCorse()}
        >
          <MagnifyingGlassIcon className="h-5" />
          <span className="hidden md:block">Serch Mixway Corse</span>
        </button>
        <pre className="bg-gray-200 w-full h-20 overflow-auto mt-2 p-3 rounded-md">
          {resultCorse}
        </pre>
      </main>
    </div>
  );
}
