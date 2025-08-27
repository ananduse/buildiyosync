import { useState } from 'react';
import { 
  MessageSquare, Reply, MoreVertical, ThumbsUp, CheckCircle, 
  XCircle, Clock, AlertCircle, ChevronDown, ChevronUp, Send,
  Paperclip, Image, AtSign, Hash
} from 'lucide-react';
import { ColorAvatar } from '@/components/ui/color-avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { DocumentComment } from '@/types/document.types';

interface DocumentCommentsProps {
  comments: DocumentComment[];
  currentUserId?: string;
  onAddComment: (comment: Partial<DocumentComment>, parentId?: string) => void;
  onResolveComment: (commentId: string) => void;
  onDeleteComment: (commentId: string) => void;
  onEditComment: (commentId: string, content: string) => void;
}

interface CommentThreadProps {
  comment: DocumentComment;
  depth: number;
  currentUserId?: string;
  onReply: (content: string, parentId: string) => void;
  onResolve: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, content: string) => void;
}

const CommentThread = ({
  comment,
  depth,
  currentUserId,
  onReply,
  onResolve,
  onDelete,
  onEdit,
}: CommentThreadProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [editContent, setEditContent] = useState(comment.content);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showReplies, setShowReplies] = useState(true);
  
  const hasReplies = comment.replies && comment.replies.length > 0;
  const isOwner = currentUserId === comment.userId;
  
  const formatTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };
  
  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(replyContent, comment.id);
      setReplyContent('');
      setIsReplying(false);
    }
  };
  
  const handleEdit = () => {
    if (editContent.trim() && editContent !== comment.content) {
      onEdit(comment.id, editContent);
      setIsEditing(false);
    }
  };
  
  const getStatusIcon = () => {
    if (comment.resolved) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (comment.priority === 'high') {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    if (comment.priority === 'medium') {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    }
    return null;
  };
  
  return (
    <div className={cn("group", depth > 0 && "ml-12")}>
      <div className={cn(
        "flex gap-3 p-3 rounded-lg transition-colors",
        depth === 0 && "hover:bg-gray-50",
        comment.resolved && "opacity-60"
      )}>
        {/* Thread Line for Replies */}
        {depth > 0 && (
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />
        )}
        
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <ColorAvatar
            name={comment.user.name}
            email={comment.user.email}
            size="sm"
          />
          {getStatusIcon() && (
            <div className="absolute -bottom-1 -right-1">
              {getStatusIcon()}
            </div>
          )}
        </div>
        
        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">{comment.user.name}</span>
              <span className="text-xs text-gray-500">{comment.user.role}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
              {comment.resolved && (
                <>
                  <span className="text-xs text-gray-400">•</span>
                  <Badge variant="outline" className="text-xs h-5">
                    Resolved by {comment.resolvedBy?.name}
                  </Badge>
                </>
              )}
              {comment.pageNumber && (
                <Badge variant="secondary" className="text-xs h-5">
                  Page {comment.pageNumber}
                </Badge>
              )}
            </div>
            
            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!comment.resolved && (
                  <>
                    <DropdownMenuItem onClick={() => onResolve(comment.id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Resolved
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {isOwner && (
                  <>
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      Edit Comment
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(comment.id)}
                      className="text-red-600"
                    >
                      Delete Comment
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Comment Body */}
          {isEditing ? (
            <div className="space-y-2 mt-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[60px] text-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleEdit}>
                  Save
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(comment.content);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {comment.content}
              </p>
              
              {/* Attachments */}
              {comment.attachments && comment.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {comment.attachments.map((attachment, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      <Paperclip className="h-3 w-3 mr-1" />
                      {attachment.name}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <Reply className="h-3 w-3" />
                  Reply
                </button>
                
                {hasReplies && (
                  <button
                    onClick={() => setShowReplies(!showReplies)}
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    {showReplies ? (
                      <>
                        <ChevronUp className="h-3 w-3" />
                        Hide {comment.replies?.length} {comment.replies?.length === 1 ? 'reply' : 'replies'}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3" />
                        Show {comment.replies?.length} {comment.replies?.length === 1 ? 'reply' : 'replies'}
                      </>
                    )}
                  </button>
                )}
              </div>
              
              {/* Reply Form */}
              {isReplying && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-2">
                    <ColorAvatar
                      name="Current User"
                      email="user@buildiyo.com"
                      size="xs"
                    />
                    <div className="flex-1">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[60px] text-sm"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsReplying(false);
                        setReplyContent('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleReply}
                      disabled={!replyContent.trim()}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Nested Replies */}
      {showReplies && hasReplies && (
        <div className="relative">
          {comment.replies?.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              currentUserId={currentUserId}
              onReply={onReply}
              onResolve={onResolve}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function DocumentComments({
  comments,
  currentUserId = 'current-user',
  onAddComment,
  onResolveComment,
  onDeleteComment,
  onEditComment,
}: DocumentCommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'all' | 'resolved' | 'unresolved'>('all');
  
  // Filter comments based on selected tab
  const filteredComments = comments.filter(comment => {
    if (selectedTab === 'resolved') return comment.resolved;
    if (selectedTab === 'unresolved') return !comment.resolved;
    return true;
  });
  
  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment({
        content: newComment,
        userId: currentUserId,
      });
      setNewComment('');
      setIsAddingComment(false);
    }
  };
  
  const handleReply = (content: string, parentId: string) => {
    onAddComment({
      content,
      userId: currentUserId,
    }, parentId);
  };
  
  const stats = {
    total: comments.length,
    resolved: comments.filter(c => c.resolved).length,
    unresolved: comments.filter(c => !c.resolved).length,
  };
  
  return (
    <TooltipProvider>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-4 py-3 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments
              <Badge variant="secondary">{stats.total}</Badge>
            </h3>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={selectedTab === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('all')}
              className="text-xs"
            >
              All ({stats.total})
            </Button>
            <Button
              size="sm"
              variant={selectedTab === 'unresolved' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('unresolved')}
              className="text-xs"
            >
              Open ({stats.unresolved})
            </Button>
            <Button
              size="sm"
              variant={selectedTab === 'resolved' ? 'default' : 'outline'}
              onClick={() => setSelectedTab('resolved')}
              className="text-xs"
            >
              Resolved ({stats.resolved})
            </Button>
          </div>
        </div>
        
        {/* Comments List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-1">
            {filteredComments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No comments yet</p>
                <p className="text-xs mt-1">Start a discussion about this document</p>
              </div>
            ) : (
              filteredComments.map((comment) => (
                <CommentThread
                  key={comment.id}
                  comment={comment}
                  depth={0}
                  currentUserId={currentUserId}
                  onReply={handleReply}
                  onResolve={onResolveComment}
                  onDelete={onDeleteComment}
                  onEdit={onEditComment}
                />
              ))
            )}
          </div>
        </ScrollArea>
        
        {/* Add Comment */}
        <div className="p-4 border-t bg-gray-50">
          {!isAddingComment ? (
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setIsAddingComment(true)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Add a comment...
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <ColorAvatar
                  name="Current User"
                  email="user@buildiyo.com"
                  size="sm"
                />
                <Textarea
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px]"
                  autoFocus
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Attach file</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Image className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Add image</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <AtSign className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Mention someone</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsAddingComment(false);
                      setNewComment('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}