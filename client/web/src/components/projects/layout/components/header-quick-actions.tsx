import { Plus, FolderPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function HeaderQuickActions() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
        onClick={() => navigate('/projects/team/invite')}
      >
        <Users className="h-4 w-4 mr-1" />
        Invite Team
      </Button>

      <Button
        size="sm"
        className="h-8 bg-purple-600 hover:bg-purple-700 text-white transition-colors"
        onClick={() => navigate('/projects/new')}
      >
        <FolderPlus className="h-4 w-4 mr-1" />
        New Project
      </Button>
    </div>
  );
}