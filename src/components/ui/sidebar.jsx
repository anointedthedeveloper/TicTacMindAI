import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const SIDEBAR_WIDTH = "16rem";
const SidebarContext = React.createContext(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

const SidebarProvider = React.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange, className, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = onOpenChange ?? _setOpen;
  const toggleSidebar = React.useCallback(() => isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o), [isMobile, setOpen]);
  return (
    <SidebarContext.Provider value={{ isMobile, open, setOpen, openMobile, setOpenMobile, toggleSidebar }}>
      <div ref={ref} className={cn("flex min-h-screen", className)} {...props}>{children}</div>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef(({ side = "left", className, children, ...props }, ref) => {
  const { open } = useSidebar();
  return (
    <div ref={ref} data-state={open ? "expanded" : "collapsed"} className={cn("relative flex h-full flex-col bg-sidebar text-sidebar-foreground transition-all duration-300", open ? `w-[${SIDEBAR_WIDTH}]` : "w-0 overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
});
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return <button ref={ref} onClick={(e) => { onClick?.(e); toggleSidebar(); }} className={cn("h-7 w-7", className)} {...props} />;
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-1 flex-col overflow-auto", className)} {...props} />);
SidebarContent.displayName = "SidebarContent";

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col gap-2 p-2", className)} {...props} />);
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col gap-2 p-2", className)} {...props} />);
SidebarFooter.displayName = "SidebarFooter";

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => <ul ref={ref} className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />);
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => <li ref={ref} className={cn("group/menu-item relative", className)} {...props} />);
SidebarMenuItem.displayName = "SidebarMenuItem";

const SidebarMenuButton = React.forwardRef(({ className, ...props }, ref) => <button ref={ref} className={cn("flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", className)} {...props} />);
SidebarMenuButton.displayName = "SidebarMenuButton";

export { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar };
