'use client';

import TextareaAutosize from "react-textarea-autosize";

export default function TextAreaNextWrapper({
  name, id, className
}: {
  name: string,
  id: string,
  className: string,
}) {
  return (
    <TextareaAutosize
      name={name}
      id={id}
      className={className}
    />
  );

}