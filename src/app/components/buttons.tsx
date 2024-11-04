import clsx from 'clsx';

export default function Button(
  attributes: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const inputAttributes = {
    ...attributes,
    className: clsx(
      'rounded-full border bg-blue-500 text-white p-3 ml-2 hover:opacity-80',
      attributes.className
    ),
  };
  return <button {...inputAttributes}>{attributes.children}</button>;
}
