import { usePagerContext } from "@/lib/providers/pager-context";
import { SlidesForm } from "./slides-form";
import { Tabs } from "./ui/tabs";

export function SlidePanel() {
  const { currentPage } = usePagerContext();

  return (
    <Tabs defaultValue="slide" className="flex-1">
      <div className="flex flex-col gap-6 w-[448px] h-[440px] ">
        <div className="border p-4 rounded  shadow">
          <SlidesForm currentSlide={currentPage} />
        </div>
      </div>
    </Tabs>
  );
}
