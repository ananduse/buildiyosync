import { useState } from 'react';
import {
  Users, UserCheck, UserX, Clock, CheckCircle, XCircle,
  AlertCircle, ArrowRight, ChevronRight, Calendar, MessageSquare,
  FileText, Shield, Building, HardHat, Briefcase
} from 'lucide-react';
import { ColorAvatar } from '@/components/ui/color-avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

interface Reviewer {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  level: number;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'conditional';
  reviewDate?: string;
  comments?: string;
  conditions?: string[];
}

interface ReviewLevel {
  level: number;
  title: string;
  description: string;
  reviewers: Reviewer[];
  requiredApprovals: number;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const REVIEW_HIERARCHY: ReviewLevel[] = [
  {
    level: 1,
    title: 'Technical Review',
    description: 'Initial technical review by department specialists',
    reviewers: [
      {
        id: 'r1',
        name: 'Michael Johnson',
        email: 'michael.johnson@buildiyo.com',
        role: 'Structural Engineer',
        department: 'Engineering',
        level: 1,
        status: 'approved',
        reviewDate: '2024-01-15T10:30:00',
        comments: 'Structural calculations verified. All load requirements met.'
      },
      {
        id: 'r2',
        name: 'Sarah Williams',
        email: 'sarah.williams@buildiyo.com',
        role: 'MEP Coordinator',
        department: 'MEP',
        level: 1,
        status: 'approved',
        reviewDate: '2024-01-15T14:20:00',
        comments: 'MEP systems coordinated. No conflicts detected.'
      },
      {
        id: 'r3',
        name: 'David Chen',
        email: 'david.chen@buildiyo.com',
        role: 'QA/QC Manager',
        department: 'Quality',
        level: 1,
        status: 'reviewing',
        reviewDate: undefined,
        comments: undefined
      }
    ],
    requiredApprovals: 3,
    deadline: '2024-01-16T18:00:00',
    status: 'in-progress'
  },
  {
    level: 2,
    title: 'Department Head Review',
    description: 'Review and approval by department heads',
    reviewers: [
      {
        id: 'r4',
        name: 'Jane Smith',
        email: 'jane.smith@buildiyo.com',
        role: 'Lead Architect',
        department: 'Architecture',
        level: 2,
        status: 'pending',
        reviewDate: undefined,
        comments: undefined
      },
      {
        id: 'r5',
        name: 'Robert Taylor',
        email: 'robert.taylor@buildiyo.com',
        role: 'Engineering Manager',
        department: 'Engineering',
        level: 2,
        status: 'pending',
        reviewDate: undefined,
        comments: undefined
      }
    ],
    requiredApprovals: 2,
    deadline: '2024-01-18T18:00:00',
    status: 'pending'
  },
  {
    level: 3,
    title: 'Project Management',
    description: 'Project manager review and coordination',
    reviewers: [
      {
        id: 'r6',
        name: 'John Doe',
        email: 'john.doe@buildiyo.com',
        role: 'Project Manager',
        department: 'Management',
        level: 3,
        status: 'pending',
        reviewDate: undefined,
        comments: undefined
      }
    ],
    requiredApprovals: 1,
    deadline: '2024-01-20T18:00:00',
    status: 'pending'
  },
  {
    level: 4,
    title: 'Client Approval',
    description: 'Final approval from client representatives',
    reviewers: [
      {
        id: 'r7',
        name: 'Client Representative',
        email: 'client@example.com',
        role: 'Owner Representative',
        department: 'Client',
        level: 4,
        status: 'pending',
        reviewDate: undefined,
        comments: undefined
      }
    ],
    requiredApprovals: 1,
    deadline: '2024-01-22T18:00:00',
    status: 'pending'
  }
];

interface DocumentReviewHierarchyProps {
  documentId: string;
  onSubmitReview: (level: number, review: any) => void;
  onRequestReview: (reviewerId: string) => void;
}

export default function DocumentReviewHierarchy({
  documentId,
  onSubmitReview,
  onRequestReview
}: DocumentReviewHierarchyProps) {
  const [hierarchy, setHierarchy] = useState<ReviewLevel[]>(REVIEW_HIERARCHY);
  const [selectedReviewer, setSelectedReviewer] = useState<Reviewer | null>(null);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'reject' | 'conditional'>('approve');
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  
  const getOverallProgress = () => {
    const totalReviewers = hierarchy.reduce((acc, level) => acc + level.reviewers.length, 0);
    const completedReviews = hierarchy.reduce((acc, level) => 
      acc + level.reviewers.filter(r => r.status !== 'pending' && r.status !== 'reviewing').length, 0
    );
    return (completedReviews / totalReviewers) * 100;
  };
  
  const getLevelProgress = (level: ReviewLevel) => {
    const completed = level.reviewers.filter(r => 
      r.status === 'approved' || r.status === 'rejected' || r.status === 'conditional'
    ).length;
    return (completed / level.reviewers.length) * 100;
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'conditional':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'reviewing':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'conditional':
        return 'bg-yellow-100 text-yellow-700';
      case 'reviewing':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getLevelIcon = (level: number) => {
    switch (level) {
      case 1:
        return <HardHat className="h-5 w-5" />;
      case 2:
        return <Briefcase className="h-5 w-5" />;
      case 3:
        return <Shield className="h-5 w-5" />;
      case 4:
        return <Building className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };
  
  const canReviewLevel = (level: ReviewLevel) => {
    if (level.level === 1) return true;
    const previousLevel = hierarchy.find(l => l.level === level.level - 1);
    if (!previousLevel) return false;
    const approvedCount = previousLevel.reviewers.filter(r => r.status === 'approved').length;
    return approvedCount >= previousLevel.requiredApprovals;
  };
  
  const handleSubmitReview = () => {
    if (!selectedReviewer || !reviewComment) return;
    
    // Update reviewer status
    const updatedHierarchy = hierarchy.map(level => ({
      ...level,
      reviewers: level.reviewers.map(reviewer => {
        if (reviewer.id === selectedReviewer.id) {
          return {
            ...reviewer,
            status: reviewDecision === 'approve' ? 'approved' : 
                   reviewDecision === 'reject' ? 'rejected' : 'conditional',
            reviewDate: new Date().toISOString(),
            comments: reviewComment
          };
        }
        return reviewer;
      })
    }));
    
    setHierarchy(updatedHierarchy);
    onSubmitReview(selectedReviewer.level, {
      reviewerId: selectedReviewer.id,
      decision: reviewDecision,
      comments: reviewComment,
      timestamp: new Date().toISOString()
    });
    
    setShowReviewDialog(false);
    setReviewComment('');
    setSelectedReviewer(null);
  };
  
  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diff < 0) return 'Overdue';
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} remaining`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    return 'Due soon';
  };
  
  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Review Progress</CardTitle>
          <CardDescription>
            Overall document review completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">{Math.round(getOverallProgress())}%</span>
            </div>
            <Progress value={getOverallProgress()} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      {/* Review Levels */}
      <div className="space-y-4">
        {hierarchy.map((level, index) => {
          const isAccessible = canReviewLevel(level);
          const isCompleted = level.status === 'completed';
          
          return (
            <Card 
              key={level.level}
              className={cn(
                "transition-all",
                !isAccessible && "opacity-50",
                isCompleted && "border-green-200 bg-green-50/30"
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      isCompleted ? "bg-green-100" : 
                      level.status === 'in-progress' ? "bg-blue-100" : "bg-gray-100"
                    )}>
                      {getLevelIcon(level.level)}
                    </div>
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        Level {level.level}: {level.title}
                        {level.status === 'in-progress' && (
                          <Badge variant="outline" className="text-xs">In Progress</Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {level.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {formatDeadline(level.deadline)}
                    </div>
                    <Progress 
                      value={getLevelProgress(level)} 
                      className="h-1 w-24 mt-2"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {level.reviewers.map((reviewer) => (
                    <div 
                      key={reviewer.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <ColorAvatar
                          name={reviewer.name}
                          email={reviewer.email}
                          size="sm"
                        />
                        <div>
                          <p className="text-sm font-medium">{reviewer.name}</p>
                          <p className="text-xs text-gray-500">{reviewer.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {reviewer.comments && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              // Show comments in a tooltip or modal
                            }}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <div className="flex items-center gap-2">
                          {getStatusIcon(reviewer.status)}
                          <Badge className={cn("text-xs", getStatusColor(reviewer.status))}>
                            {reviewer.status}
                          </Badge>
                        </div>
                        
                        {reviewer.status === 'pending' && isAccessible && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedReviewer(reviewer);
                              setShowReviewDialog(true);
                            }}
                          >
                            Submit Review
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Level Summary */}
                <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Required approvals: {level.requiredApprovals}
                  </span>
                  <span className="font-medium">
                    {level.reviewers.filter(r => r.status === 'approved').length} / {level.requiredApprovals} approved
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogDescription>
              Provide your review decision and comments for this document.
            </DialogDescription>
          </DialogHeader>
          
          {selectedReviewer && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ColorAvatar
                  name={selectedReviewer.name}
                  email={selectedReviewer.email}
                  size="md"
                />
                <div>
                  <p className="font-medium">{selectedReviewer.name}</p>
                  <p className="text-sm text-gray-500">{selectedReviewer.role}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Review Decision</label>
                <Select value={reviewDecision} onValueChange={(v: any) => setReviewDecision(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Approve
                      </div>
                    </SelectItem>
                    <SelectItem value="conditional">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        Approve with Conditions
                      </div>
                    </SelectItem>
                    <SelectItem value="reject">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Reject
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Comments</label>
                <Textarea
                  placeholder="Provide your review comments..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReview}
              disabled={!reviewComment.trim()}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}