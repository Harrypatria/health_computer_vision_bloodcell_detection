import { Menu, LogOut, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeProvider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 glass border-b border-border/40 shadow-sm backdrop-blur-md bg-background/60" />
      <div className="relative flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleSidebar}
                  className="md:hidden hover:bg-primary/10 transition-colors"
                >
                  <Menu className="h-5 w-5 text-foreground/80" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Menu</TooltipContent>
            </Tooltip>
          )}
          <div className="flex items-center gap-3 group cursor-default">
            <div className="h-9 w-9 relative transition-transform duration-300 group-hover:scale-110">
              <img src="/Logo.png" alt="Patria & Co." className="object-contain w-full h-full drop-shadow-md" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Computer Vision Lab App
              </h1>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Blood Cell Detection</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isAuthenticated && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="hover:bg-primary/10 transition-colors rounded-full w-9 h-9"
                  >
                    <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
                    <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-400" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle theme</TooltipContent>
              </Tooltip>

              <div className="h-4 w-[1px] bg-border/60 mx-2" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={logout} 
                    className="gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-full px-4"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline font-medium">Logout</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Sign out of your session</TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
