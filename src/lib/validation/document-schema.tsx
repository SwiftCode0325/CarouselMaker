import * as z from "zod";
import { SlideSchema } from "./slide-schema";
import { ThemeSchema } from "./theme-schema";
import { SettingsSchema } from "./settings-schema";

export const DocumentSchema = z.object({
  slides: z.array(SlideSchema),
  settings: SettingsSchema,
  theme: ThemeSchema,
});
