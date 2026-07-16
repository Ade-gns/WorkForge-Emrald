import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Dumbbell } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border lg:block">
        <Sidebar />
      </aside>

      {/* Sidebar mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 border-r border-border bg-[#080808] p-0">
          <Sidebar mobile onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        {/* Header mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-black/60 px-4 py-3 backdrop-blur-xl lg:hidden">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-black">
              <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <span className="font-display font-black">WORK<span className="text-emerald-500">FORGE</span></span>
          </div>
          <button data-testid="open-sidebar-btn" onClick={() => setOpen(true)} className="rounded-lg p-2 text-zinc-300 hover:bg-zinc-900 hover:text-white">
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
