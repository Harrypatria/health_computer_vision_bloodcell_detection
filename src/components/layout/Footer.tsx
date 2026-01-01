import { ExternalLink, Linkedin, Globe } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const Footer = () => {
  return (
    <footer className="mt-auto py-8 px-6 border-t border-border/40 glass bg-background/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-medium text-foreground tracking-tight">
            Created by <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dr Harry Patria</span>
          </p>
          <p className="text-xs text-muted-foreground/80 font-medium">
            Patria & Co. — Data, AI and Strategy Consultant
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <a
            href="https://www.patriaco.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <div className="p-1.5 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Globe className="h-3.5 w-3.5" />
            </div>
            <span className="font-medium group-hover:underline decoration-primary/30 underline-offset-4">www.patriaco.co.uk</span>
          </a>
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs text-muted-foreground/60 font-mono">
            © 2026 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
