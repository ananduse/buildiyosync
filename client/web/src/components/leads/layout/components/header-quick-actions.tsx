import { Plus, Upload, Download } from 'lucide-react';
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
        onClick={() => navigate('/leads/import')}
      >
        <Upload className="h-4 w-4 mr-1" />
        Import
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
      >
        <Download className="h-4 w-4 mr-1" />
        Export
      </Button>

      <Button
        size="sm"
        className="h-8 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        onClick={() => navigate('/leads/add')}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Lead
      </Button>
    </div>
  );
}