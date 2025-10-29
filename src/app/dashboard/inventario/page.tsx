import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import InventoryTable from "@/components/table-me";
export default function Dashtests() {
  return (
    <>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <InventoryTable />
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
