"use client";

import { PropsWithChildren } from "react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disable={pending} className="w-full mt-2">
      {pending ? "Submitting" : children}
    </Button>
  );
};
export default SubmitButton;
