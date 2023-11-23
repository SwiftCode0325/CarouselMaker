"use client";

import Link from "next/link";
// import { SidebarNavItem } from "types/nav";

import { cn } from "@/lib/utils";
import { BrandForm } from "@/components/forms/brand-form";
import { ThemeForm } from "@/components/forms/theme-form";
import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from "@/components/ui/vertical-tabs";
import { usePagerContext } from "@/lib/providers/pager-context";
import { Separator } from "@/components/ui/separator";
import { FontsForm } from "@/components/forms/fonts-form";
import { PageNumberForm } from "./forms/page-number-form";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Briefcase,
  FileDigit,
  LucideIcon,
  Palette,
  Plus,
  Type,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Drawer } from "vaul";
import { DrawerContent, DrawerTrigger } from "@/components/drawer";
import { ReactNode } from "react";
import { buttonVariants } from "./ui/button";
import { ScrollBar } from "./ui/scroll-area";

type TabInfo = {
  name: string;
  value: string;
  icon: LucideIcon;
};

const ALL_FORMS: Record<string, TabInfo> = {
  brand: {
    name: "Brand",
    value: "brand",
    icon: Briefcase,
  },
  theme: {
    name: "Theme",
    value: "theme",
    icon: Palette,
  },
  fonts: {
    name: "Fonts",
    value: "fonts",
    icon: Type,
  },
  pageNumber: {
    name: "Numbers",
    value: "number",
    icon: FileDigit,
  },
};

export function SettingsPanel({ className }: { className?: string }) {
  return (
    <>
      <aside className="top-14 z-30 hidden h-full w-full shrink-0 md:sticky md:block border-r">
        <SidebarFormsPanel />
      </aside>
      <div className="block md:hidden">
        <Drawer.Root modal={true}>
          <DrawerTrigger>
            <CircularFloatingButton>
              <Plus className="w-4 h-4" />
            </CircularFloatingButton>
          </DrawerTrigger>
          <DrawerContent className="h-[60%] ">
            <DrawerFormsPanel className="mt-8" />
          </DrawerContent>
        </Drawer.Root>
      </div>
    </>
  );
}

function VerticalTabTriggerButton({ tabInfo }: { tabInfo: TabInfo }) {
  return (
    <VerticalTabsTrigger
      value={tabInfo.value}
      className="h-16 flex flex-col gap-2 items-center py-2 justify-center"
    >
      <tabInfo.icon className="h-4 w-4" />
      <span className="sr-only ">{tabInfo.name}</span>
      <p className="text-xs">{tabInfo.name}</p>
    </VerticalTabsTrigger>
  );
}

function HorizontalTabTriggerButton({ tabInfo }: { tabInfo: TabInfo }) {
  return (
    <TabsTrigger
      value={tabInfo.value}
      className="h-16 flex flex-col gap-2 items-center py-2 justify-center"
    >
      <tabInfo.icon className="h-4 w-4" />
      <span className="sr-only ">{tabInfo.name}</span>
      <p className="text-xs">{tabInfo.name}</p>
    </TabsTrigger>
  );
}

export function SidebarFormsPanel() {
  return (
    <VerticalTabs
      defaultValue={ALL_FORMS.brand.value}
      className="flex-1 min-h-[600px] h-full p-0"
    >
      <div className="flex flex-row h-full w-full">
        <ScrollArea className="border-r h-full bg-muted">
          <VerticalTabsList className="grid grid-cols-1 gap-2 w-20 rounded-none">
            <VerticalTabTriggerButton tabInfo={ALL_FORMS.brand} />
            <VerticalTabTriggerButton tabInfo={ALL_FORMS.theme} />
            <VerticalTabTriggerButton tabInfo={ALL_FORMS.fonts} />
            <VerticalTabTriggerButton tabInfo={ALL_FORMS.pageNumber} />
          </VerticalTabsList>
        </ScrollArea>
        <div className="p-2 flex flex-col items-stretch w-full ">
          <VerticalTabsContent
            value={ALL_FORMS.brand.value}
            className="mt-0 border-0 p-0 m-4"
          >
            <h4 className="text-xl font-semibold">{ALL_FORMS.brand.name}</h4>
            <Separator className="mt-2 mb-4"></Separator>
            <BrandForm />
          </VerticalTabsContent>
          <VerticalTabsContent
            value={ALL_FORMS.theme.value}
            className="mt-0 border-0 p-0 m-4"
          >
            <h4 className="text-xl font-semibold">{ALL_FORMS.theme.name}</h4>
            <Separator className="mt-2 mb-4"></Separator>
            <ThemeForm />
          </VerticalTabsContent>
          <VerticalTabsContent
            value={ALL_FORMS.fonts.value}
            className="mt-0 border-0 p-0 m-4"
          >
            <h4 className="text-xl font-semibold">{ALL_FORMS.fonts.name}</h4>
            <Separator className="mt-2 mb-4"></Separator>
            <FontsForm />
          </VerticalTabsContent>
          <VerticalTabsContent
            value={ALL_FORMS.pageNumber.value}
            className="mt-0 border-0 p-0 m-4"
          >
            <h4 className="text-xl font-semibold">
              {ALL_FORMS.pageNumber.name}
            </h4>
            <Separator className="mt-2 mb-4"></Separator>
            <PageNumberForm />
          </VerticalTabsContent>
        </div>
      </div>
    </VerticalTabs>
  );
}

export function DrawerFormsPanel({ className }: { className: string }) {
  return (
    <Tabs
      defaultValue={ALL_FORMS.brand.value}
      className={cn("flex-1 w-full", className)}
    >
      <div className="flex flex-col h-full ">
        <ScrollArea className=" border-b h-full bg-muted">
          <TabsList className="grid grid-cols-4 gap-2 h-20 rounded-none">
            <HorizontalTabTriggerButton tabInfo={ALL_FORMS.brand} />
            <HorizontalTabTriggerButton tabInfo={ALL_FORMS.theme} />
            <HorizontalTabTriggerButton tabInfo={ALL_FORMS.fonts} />
            <HorizontalTabTriggerButton tabInfo={ALL_FORMS.pageNumber} />
          </TabsList>
        </ScrollArea>
        <div className="p-2 w-[320px] m-auto">
          {/* // TODO Should be in a ScrollArea but it does not scroll */}
          <TabsContent
            value={ALL_FORMS.brand.value}
            className="mt-0 border-0 p-0 m-4 "
          >
            <h4 className="text-xl font-semibold">{ALL_FORMS.brand.name}</h4>
            <Separator className="mt-2 mb-4"></Separator>
            <BrandForm />
          </TabsContent>
          <TabsContent
            value={ALL_FORMS.theme.value}
            className="mt-0 border-0 p-0 m-4 "
          >
            <h4 className="text-xl font-semibold">{ALL_FORMS.theme.name}</h4>
            <Separator className="mt-2 mb-4"></Separator>
            <ThemeForm />
          </TabsContent>
          <TabsContent
            value={ALL_FORMS.fonts.value}
            className="mt-0 border-0 p-0 m-4"
          >
            <h4 className="text-xl font-semibold">{ALL_FORMS.fonts.name}</h4>
            <Separator className="mt-2 mb-4"></Separator>
            <FontsForm />
          </TabsContent>
          <TabsContent
            value={ALL_FORMS.pageNumber.value}
            className="mt-0 border-0 p-0 m-4"
          >
            <h4 className="text-xl font-semibold">
              {ALL_FORMS.pageNumber.name}
            </h4>
            <Separator className="mt-2 mb-4"></Separator>
            <PageNumberForm />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}

const CircularFloatingButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        buttonVariants({
          variant: "default",
          size: "icon",
        }),
        "fixed bottom-4 right-4 rounded-full w-12 h-12 "
      )}
    >
      {children}
    </div>
  );
};
