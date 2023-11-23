import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { convertFileToDataUrl } from "@/lib/convert-file";
import { DocumentFormReturn } from "@/lib/document-form-types";
import imageCompression from "browser-image-compression";
import { MAX_IMAGE_SIZE_MB, MAX_IMAGE_WIDTH } from "../intro-slide-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ImageInputType } from "@/lib/validation/image-schema";

export type ImageFormType = "backgroundImage" | "image";

export function ImageSourceFormField({
  fieldName,
  form,
  formType,
}: {
  fieldName:
    | `slides.${number}.image.source`
    | `slides.${number}.backgroundImage.source`
    | "config.brand.avatar.source";
  form: DocumentFormReturn;
  formType: ImageFormType;
}) {
  return (
    <Tabs
      onValueChange={(tabValue) =>
        form.setValue(fieldName, { type: tabValue as ImageInputType, src: "" })
      }
      defaultValue={form.getValues(`${fieldName}.type`)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={ImageInputType.Url}>URL</TabsTrigger>
        <TabsTrigger value={ImageInputType.Upload}>Upload</TabsTrigger>
      </TabsList>
      <TabsContent value={ImageInputType.Url}>
        <FormField
          control={form.control}
          name={`${fieldName}.src`}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  {formType == "backgroundImage" ? "Image Background" : "Image"}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Url to an image"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </TabsContent>
      <TabsContent value={ImageInputType.Upload}>
        <FormField
          control={form.control}
          name={`${fieldName}.src`}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  {formType == "backgroundImage" ? "Image Background" : "Image"}
                </FormLabel>
                <FormControl>
                  <Input
                    accept=".jpg, .jpeg, .png, .svg, .webp"
                    type="file"
                    onChange={async (e) => {
                      const file = e.target?.files ? e.target?.files[0] : null;

                      if (file) {
                        // Check image dimensions
                        // const image = new Image();
                        // image.src = URL.createObjectURL(file);
                        // await image.decode(); // Wait for image to load
                        // if (image.width > MAX_IMAGE_WIDTH) {
                        //   console.log(
                        //     `Image width exceeds the maximum limit of ${MAX_IMAGE_WIDTH} pixels.`
                        //   );
                        //   return;
                        // }
                        const compressedFile = await imageCompression(file, {
                          maxSizeMB: MAX_IMAGE_SIZE_MB,
                          maxWidthOrHeight: MAX_IMAGE_WIDTH,
                        });
                        const dataUrl = await convertFileToDataUrl(
                          compressedFile
                        );
                        field.onChange(dataUrl ? dataUrl : "");
                      } else {
                        console.error("No valid image file selected.");
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </TabsContent>
    </Tabs>
  );
}
