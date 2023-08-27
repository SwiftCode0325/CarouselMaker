import Pager from "@/components/pager";
import { UseFormReturn, useFormContext } from "react-hook-form";
import * as z from "zod";

import { DocumentSchema } from "@/lib/validation/document-schema";
import { Button } from "./ui/button";

export function EditorMenubar() {
  const {
    reset,
  }: UseFormReturn<
    z.infer<typeof DocumentSchema>,
    any,
    undefined
  > = useFormContext(); // retrieve those props

  return (
    <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
      <h2 className="text-lg font-semibold">Canvas</h2>{" "}
      <div className="ml-auto flex w-full space-x-2 sm:justify-end">
        {/* <PresetSelector presets={presets} /> */}
        {/* <PresetSave /> */}
        <div className="hidden space-x-2 md:flex">
          {/* <CodeViewer /> */}
          {/* <PresetShare /> */}
        </div>
        {/* <PresetActions /> */}
        <Pager />
        <Button onClick={() => reset()} variant="outline" size="sm">
          Reset
        </Button>
      </div>
    </div>
  );
}
