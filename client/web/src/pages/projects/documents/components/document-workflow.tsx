import { useState } from 'react';
import { 
  ArrowRight, CheckCircle, XCircle, Clock, AlertTriangle, 
  ChevronRight, User, Calendar, FileText, Edit, Eye, Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { WORKFLOW_STATUSES, STANDARD_WORKFLOW, type Document } from '@/types/document.types';

interface DocumentWorkflowProps {
  document: Document;
  onStatusChange: (newStatus: string, comment?: string) => void;
}

export default function DocumentWorkflow({ document, onStatusChange }: DocumentWorkflowProps) {
  const [showTransitionDialog, setShowTransitionDialog] = useState(false);
  const [selectedTransition, setSelectedTransition] = useState<string>('');
  const [transitionComment, setTransitionComment] = useState('');
  const [selectedApprovers, setSelectedApprovers] = useState<string[]>([]);
  
  const currentStatus = document.currentVersion.status;
  const workflow = STANDARD_WORKFLOW;
  
  // Get available transitions based on current status
  const getAvailableTransitions = () => {
    const transitions = [];
    
    switch (currentStatus) {
      case 'draft':
        transitions.push({ to: 'review', label: 'Submit for Review', color: 'blue' });
        break;
      case 'review':
        transitions.push({ to: 'approved', label: 'Approve', color: 'green' });
        transitions.push({ to: 'rejected', label: 'Reject', color: 'red' });
        transitions.push({ to: 'draft', label: 'Return to Draft', color: 'gray' });
        break;
      case 'approved':
        transitions.push({ to: 'archived', label: 'Archive', color: 'gray' });
        break;
      case 'rejected':
        transitions.push({ to: 'draft', label: 'Revise', color: 'blue' });
        transitions.push({ to: 'archived', label: 'Archive', color: 'gray' });
        break;
    }
    
    return transitions;
  };
  
  const availableTransitions = getAvailableTransitions();
  
  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      draft: Edit,
      review: Eye,
      approved: CheckCircle,
      rejected: XCircle,
      archived: Archive,
    };
    return icons[status] || FileText;
  };
  
  const getStatusColor = (status: string) => {
    const statusConfig = WORKFLOW_STATUSES.find(s => s.id === status);
    return statusConfig?.color || '#6B7280';
  };
  
  const handleTransition = (toStatus: string) => {
    setSelectedTransition(toStatus);
    setShowTransitionDialog(true);
  };
  
  const confirmTransition = () => {
    onStatusChange(selectedTransition, transitionComment);
    setShowTransitionDialog(false);
    setTransitionComment('');
    setSelectedApprovers([]);
  };
  
  const getWorkflowProgress = () => {
    const statusOrder = ['draft', 'review', 'approved'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };
  
  // Mock workflow history
  const workflowHistory = [
    {
      id: '1',
      action: 'Document Created',
      fromStatus: null,
      toStatus: 'draft',
      user: { name: 'John Doe', role: 'Project Manager' },
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      comment: 'Initial draft created',
    },
    {
      id: '2',
      action: 'Submitted for Review',
      fromStatus: 'draft',
      toStatus: 'review',
      user: { name: 'Jane Smith', role: 'Architect' },
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      comment: 'Ready for technical review',
    },
  ];
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Document Workflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {(() => {
                const StatusIcon = getStatusIcon(currentStatus);
                return (
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: getStatusColor(currentStatus) + '20' }}
                  >
                    <StatusIcon 
                      className="h-5 w-5"
                      style={{ color: getStatusColor(currentStatus) }}
                    />
                  </div>
                );
              })()}
              <div>
                <p className="text-sm text-gray-600">Current Status</p>
                <p className="font-semibold capitalize">{currentStatus}</p>
              </div>
            </div>
            
            {availableTransitions.length > 0 && (
              <div className="flex items-center gap-2">
                {availableTransitions.map((transition) => (
                  <Button
                    key={transition.to}
                    size="sm"
                    variant={transition.color === 'green' ? 'default' : 'outline'}
                    onClick={() => handleTransition(transition.to)}
                    className={cn(
                      transition.color === 'red' && 'text-red-600 hover:bg-red-50',
                      transition.color === 'blue' && 'text-blue-600 hover:bg-blue-50'
                    )}
                  >
                    {transition.label}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          {/* Workflow Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Workflow Progress</p>
              <span className="text-sm font-medium">{getWorkflowProgress().toFixed(0)}%</span>
            </div>
            <Progress value={getWorkflowProgress()} className="h-2" />
            
            {/* Workflow Steps */}
            <div className="flex items-center justify-between mt-4">
              {['draft', 'review', 'approved'].map((status, index) => {
                const isCompleted = ['draft', 'review', 'approved'].indexOf(currentStatus) >= index;
                const isCurrent = currentStatus === status;
                
                return (
                  <div key={status} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                          isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500",
                          isCurrent && "ring-2 ring-offset-2 ring-green-500"
                        )}
                      >
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <span className="text-xs mt-2 capitalize">{status}</span>
                    </div>
                    {index < 2 && (
                      <div
                        className={cn(
                          "flex-1 h-0.5 mx-2",
                          isCompleted ? "bg-green-500" : "bg-gray-200"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Workflow History */}
          <div>
            <p className="text-sm font-medium mb-3">Workflow History</p>
            <div className="space-y-3">
              {workflowHistory.map((entry, index) => (
                <div key={entry.id} className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    {index < workflowHistory.length - 1 && (
                      <div className="absolute top-8 left-4 h-full w-0.5 bg-gray-200" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{entry.action}</p>
                      {entry.toStatus && (
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                          style={{ 
                            borderColor: getStatusColor(entry.toStatus),
                            color: getStatusColor(entry.toStatus)
                          }}
                        >
                          {entry.toStatus}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {entry.user.name} · {entry.user.role} · {formatDate(entry.timestamp)}
                    </p>
                    {entry.comment && (
                      <p className="text-sm text-gray-700 mt-2 p-2 bg-gray-50 rounded">
                        {entry.comment}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Transition Dialog */}
      <Dialog open={showTransitionDialog} onOpenChange={setShowTransitionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Document Status</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge>{currentStatus}</Badge>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <Badge 
                  style={{ 
                    backgroundColor: getStatusColor(selectedTransition) + '20',
                    color: getStatusColor(selectedTransition)
                  }}
                >
                  {selectedTransition}
                </Badge>
              </div>
            </div>
            
            {selectedTransition === 'approved' && (
              <div>
                <Label>Select Approvers</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose approvers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">John Doe - Project Manager</SelectItem>
                    <SelectItem value="user2">Jane Smith - Lead Architect</SelectItem>
                    <SelectItem value="user3">Mike Johnson - Technical Director</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div>
              <Label htmlFor="comment">Comment (Required)</Label>
              <Textarea
                id="comment"
                placeholder="Provide a reason for this status change..."
                value={transitionComment}
                onChange={(e) => setTransitionComment(e.target.value)}
                rows={4}
              />
            </div>
            
            {selectedTransition === 'rejected' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-4 w-4" />
                  <p className="text-sm font-medium">Important</p>
                </div>
                <p className="text-sm text-red-600 mt-1">
                  Rejecting this document will require the author to make revisions before resubmitting.
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransitionDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmTransition}
              disabled={!transitionComment.trim()}
            >
              Confirm Status Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}