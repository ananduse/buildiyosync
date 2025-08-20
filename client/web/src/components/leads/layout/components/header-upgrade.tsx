import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function HeaderUpgrade() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-blue-400 hover:text-blue-300 hover:bg-zinc-800 hover:border-zinc-800"
    >
      <Sparkles className="h-3.5 w-3.5 mr-1" />
      Upgrade
    </Button>
  );
}