import Image from 'next/image';
import Navbar from '@/app/components/navbar';

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <main className="flex flex-col justify-items-center sm:items-start max-w-lg w-lvw">
        <Navbar />
        <Image
          className="dark:invert my-8"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ul className="list-disc">
          <li className="my-2">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="/demo/station"
            >
              駅探索 /v1/json/station
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="/demo/course"
            >
              経路探索 /v1/json/search/course/extreme
            </a>
          </li>
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
