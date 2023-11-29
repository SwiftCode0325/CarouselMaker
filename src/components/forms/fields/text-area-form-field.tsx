import { AutoTextarea } from "@/components/ui/auto-text-area";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DocumentFormReturn,
  TextFieldTextPath,
} from "@/lib/document-form-types";
import { getSlideNumber } from "@/lib/field-path";
import { usePagerContext } from "@/lib/providers/pager-context";
import { useSelectionContext } from "@/lib/providers/selection-context";

import { CSSProperties } from "react";
import { set } from "zod";

export function TextAreaFormField({
  form,
  fieldName,
  label,
  placeholder,
  className = "",
  style = {},
}: {
  form: DocumentFormReturn;
  fieldName: TextFieldTextPath;
  label: string;
  placeholder: string;
  className?: string;
  style?: CSSProperties;
}) {
  const { setCurrentSelection } = useSelectionContext();
  const { setCurrentPage } = usePagerContext();
  const pageNumber = getSlideNumber(fieldName);
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={"space-y-0"}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <AutoTextarea
              placeholder={placeholder}
              className={className}
              style={style}
              {...field}
              onFocus={(event) => {
                setCurrentSelection(fieldName, event);
                setCurrentPage(pageNumber);
              }}
              // TODO: Create currentHover
              // Link with onMouseEnter and onMouseLeave
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
