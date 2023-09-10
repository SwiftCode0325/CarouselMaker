import { SlidePanel } from "./slide-panel";
import SlideMenubar from "./slide-menubar";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  DocumentFormReturn,
  SlidesFieldArrayReturn,
} from "@/lib/document-form-types";
import { ReactDocument } from "./react-document";
import React from "react";
import useWindowDimensions from "@/lib/hooks/use-window-dimensions";
import { SIZE } from "@/lib/pdf-resources";

interface SlidesEditorProps {
  instanceUrl: string;
  docReference: React.MutableRefObject<null>;
}

export function SlidesEditor({ instanceUrl, docReference }: SlidesEditorProps) {
  const { control, watch }: DocumentFormReturn = useFormContext();
  const document = watch();
  const { width: windowWidth } = useWindowDimensions();
  const SCALE = Math.min(1, windowWidth / 2.0 / SIZE.width);

  const slidesFieldArray: SlidesFieldArrayReturn = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "slides", // unique name for your Field Array
  });

  return (
    <div className="flex flex-col w-full items-center justify-start">
      <div className=" flex flex-col p-4 w-full items-center justify-start gap-3 rounded font-mono text-sm border shadow">
        <SlideMenubar slidesFieldArray={slidesFieldArray} />
        <div
          className="overflow-clip w-full relative" //flex items-center justify-center
          style={{
            height: `${SIZE.height * SCALE}px`,
          }}
        >
          <ReactDocument
            document={document}
            docReference={docReference}
            slidesFieldArray={slidesFieldArray}
            scale={SCALE}
          />
        </div>
        <SlidePanel slidesFieldArray={slidesFieldArray} scale={SCALE} />
      </div>
    </div>
  );
}
