import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

export function HeaderNotifications() {
  const notifications = [
    {
      id: 1,
      title: 'New lead assigned',
      description: 'John Doe has been assigned to you',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Task deadline approaching',
      description: 'Follow up with client ABC Corp',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'Deal closed',
      description: 'Deal #1234 has been successfully closed',
      time: '2 hours ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8 relative"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-blue-500 hover:text-blue-600">
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
              <div className="flex justify-between w-full">
                <span className="font-medium text-sm">{notification.title}</span>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </div>
              <span className="text-xs text-muted-foreground mt-1">{notification.description}</span>
              <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center text-sm text-blue-500 hover:text-blue-600">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}