import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

export function HeaderNew() {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-zinc-800 hover:border-zinc-800">
          <CirclePlus className="size-4 text-white"/>
          New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Create New</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/leads/add')}>
          New Lead
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/leads/additional/task-management')}>
          New Task
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/leads/sales/deals')}>
          New Deal
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/leads/communication/email-composer')}>
          New Email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/leads/forms/builder')}>
          New Form
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}