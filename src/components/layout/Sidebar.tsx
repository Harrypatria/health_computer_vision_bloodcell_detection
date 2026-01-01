import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Cog, 
  ImagePlus, 
  BarChart3, 
  X,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard', description: 'Overview and quick stats' },
  { path: '/background', icon: BookOpen, label: 'Background', description: 'YOLO model introduction' },
  { path: '/methods', icon: Cog, label: 'Methods', description: 'Technical methodology' },
  { path: '/prediction', icon: ImagePlus, label: 'Prediction', description: 'Upload and analyze images' },
  { path: '/results', icon: BarChart3, label: 'Results', description: 'View analysis history' },
];

export const Sidebar = ({ isOpen, isCollapsed, onClose, onToggleCollapse }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 transition-all duration-300 ease-in-out",
          "bg-sidebar border-r border-sidebar-border",
          // Mobile
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop
          "md:translate-x-0",
          isCollapsed ? "md:w-16" : "md:w-64",
          "w-64"
        )}
      >
        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 md:hidden"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Desktop collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="hidden md:flex absolute -right-3 top-4 h-6 w-6 rounded-full border border-border bg-background hover:bg-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>

        <nav className="flex flex-col gap-1 p-3 mt-8 md:mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            const linkContent = (
              <NavLink
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-sidebar-accent group",
                  isActive && "bg-sidebar-accent text-sidebar-primary border-l-2 border-sidebar-primary"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0 transition-colors",
                  isActive ? "text-sidebar-primary" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                )} />
                {!isCollapsed && (
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-sm font-medium",
                      isActive ? "text-sidebar-primary" : "text-sidebar-foreground"
                    )}>
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground hidden lg:block">
                      {item.description}
                    </span>
                  </div>
                )}
              </NavLink>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.path}>{linkContent}</div>;
          })}
        </nav>

        {/* Version info */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="p-3 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
              <p className="text-xs font-medium text-sidebar-foreground">YOLO v10/v11</p>
              <p className="text-xs text-muted-foreground">Object Detection Model</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
