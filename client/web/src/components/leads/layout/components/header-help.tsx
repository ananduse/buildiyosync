import { Button } from '@/components/ui/button';
import { HelpCircle, Book, MessageCircle, FileQuestion, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function HeaderHelp() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Help & Support</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Book className="mr-2 h-4 w-4" />
          Documentation
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageCircle className="mr-2 h-4 w-4" />
          Contact Support
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileQuestion className="mr-2 h-4 w-4" />
          FAQs
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ExternalLink className="mr-2 h-4 w-4" />
          Community Forum
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}