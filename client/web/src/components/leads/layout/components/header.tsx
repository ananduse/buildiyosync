import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Bell, Search, Plus, HelpCircle, Settings, 
  User, LogOut, ChevronDown 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  return (
    <header className="fixed top-0 start-0 end-0 z-[10] flex items-center justify-between h-[var(--header-height)] bg-zinc-950 border-b border-zinc-950 dark:border-border transition-[start] duration-200 ease-in-out pe-[var(--removed-body-scroll-bar-size,0px)]">
      <div className="container-fluid flex justify-between items-stretch lg:gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-semibold text-sm">Leads CRM</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-400 hover:text-blue-300 hover:bg-zinc-800"
          >
            Upgrade
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
          
          <Separator orientation="vertical" className="bg-zinc-600 h-4 mx-1" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8 relative"
              >
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New lead assigned</DropdownMenuItem>
              <DropdownMenuItem>Task deadline approaching</DropdownMenuItem>
              <DropdownMenuItem>Pipeline stage updated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
          
          <Separator orientation="vertical" className="bg-zinc-600 h-4 mx-1" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-300 hover:bg-zinc-800 h-8 px-2"
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}