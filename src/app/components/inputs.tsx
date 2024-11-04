import clsx from 'clsx';

export default function Input(
  attributes: React.InputHTMLAttributes<HTMLInputElement>
) {
  const inputAttributes = {
    ...attributes,
    className: clsx(
      'rounded-md border border-gray-200 p-3 m-1 text-sm outline-2 placeholder:text-gray-500',
      attributes.className
    ),
  };
  return <input {...inputAttributes} />;
}
