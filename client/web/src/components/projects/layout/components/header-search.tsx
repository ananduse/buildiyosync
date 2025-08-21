import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function HeaderSearch() {
  return (
    <div className="relative w-64">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="Search projects..."
        className="h-8 pl-8 pr-2 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:bg-zinc-700"
      />
    </div>
  );
}