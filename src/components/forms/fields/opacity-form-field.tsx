import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import {
  DocumentFormReturn,
  ImageStyleOpacityFieldPath,
} from "@/lib/document-form-types";

export function OpacityFormField({
  fieldName,
  form,
  label,
  disabled = false,
  className = "",
}: {
  fieldName: ImageStyleOpacityFieldPath;
  form: DocumentFormReturn;
  label: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field: { value, onChange } }) => {
        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Slider
                disabled={disabled}
                min={0}
                max={100}
                step={1}
                defaultValue={[value]}
                onValueChange={(vals) => {
                  onChange(vals[0]);
                }}
                value={[form.getValues(fieldName)]}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
