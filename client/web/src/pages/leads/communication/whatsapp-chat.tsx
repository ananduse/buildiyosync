import { useState, useMemo, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  Search,
  MoreHorizontal,
  Star,
  Archive,
  Trash2,
  Pin,
  Reply,
  Forward,
  Copy,
  Download,
  Image,
  FileText,
  Mic,
  MicOff,
  Play,
  Pause,
  User,
  Users,
  Clock,
  CheckCircle,
  Check,
  Eye,
  Settings,
  Plus,
  Filter,
  Tag,
  Calendar,
  Building2,
  MapPin,
  Activity,
  Zap,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  RefreshCw,
  X,
  ChevronDown,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface Lead {
  id: string;
  name: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  temperature: 'hot' | 'warm' | 'cold';
  assignedTo: {
    name: string;
    avatar: string;
  };
  lastActivity: Date;
  tags: string[];
}

interface WhatsAppMessage {
  id: string;
  chatId: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'audio' | 'video' | 'location' | 'template';
  direction: 'inbound' | 'outbound';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isLead: boolean;
  };
  attachment?: {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    thumbnail?: string;
  };
  replyTo?: {
    messageId: string;
    content: string;
    sender: string;
  };
  metadata?: {
    templateName?: string;
    location?: {
      lat: number;
      lng: number;
      address: string;
    };
    duration?: number; // for audio/video
  };
}

interface WhatsAppChat {
  id: string;
  leadId: string;
  lead: Lead;
  lastMessage: WhatsAppMessage;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  tags: string[];
  createdAt: Date;
}

interface QuickReply {
  id: string;
  text: string;
  category: 'greeting' | 'question' | 'closing' | 'custom';
}

interface WhatsAppTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  variables: string[];
  isApproved: boolean;
}

// Mock data
const mockLeads: Lead[] = [
  {
    id: 'L001',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    contact: 'John Smith',
    phone: '+1 555-123-4567',
    email: 'john@acme.com',
    status: 'qualified',
    temperature: 'hot',
    assignedTo: { name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
    lastActivity: new Date(2024, 0, 18),
    tags: ['high-value', 'urgent']
  },
  {
    id: 'L002',
    name: 'TechStart Inc',
    company: 'TechStart Inc',
    contact: 'Emily Davis',
    phone: '+1 555-987-6543',
    email: 'emily@techstart.com',
    status: 'proposal',
    temperature: 'warm',
    assignedTo: { name: 'Mike Chen', avatar: '/avatars/mike.jpg' },
    lastActivity: new Date(2024, 0, 17),
    tags: ['follow-up']
  }
];

const mockMessages: WhatsAppMessage[] = [
  {
    id: 'M001',
    chatId: 'C001',
    content: 'Hi Sarah, thank you for the detailed proposal. We have reviewed it and have a few questions.',
    type: 'text',
    direction: 'inbound',
    timestamp: new Date(2024, 0, 20, 14, 30),
    status: 'read',
    sender: {
      id: 'L001',
      name: 'John Smith',
      isLead: true
    }
  },
  {
    id: 'M002',
    chatId: 'C001',
    content: 'Great! I\'m happy to answer any questions you have. Would you prefer to discuss over a call or continue here? 📞',
    type: 'text',
    direction: 'outbound',
    timestamp: new Date(2024, 0, 20, 14, 35),
    status: 'read',
    sender: {
      id: 'U001',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      isLead: false
    }
  },
  {
    id: 'M003',
    chatId: 'C001',
    content: 'Let\'s continue here for now. My main concern is about the timeline.',
    type: 'text',
    direction: 'inbound',
    timestamp: new Date(2024, 0, 20, 14, 40),
    status: 'read',
    sender: {
      id: 'L001',
      name: 'John Smith',
      isLead: true
    }
  },
  {
    id: 'M004',
    chatId: 'C001',
    content: '',
    type: 'document',
    direction: 'outbound',
    timestamp: new Date(2024, 0, 20, 14, 45),
    status: 'delivered',
    sender: {
      id: 'U001',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      isLead: false
    },
    attachment: {
      id: 'A001',
      name: 'Updated_Timeline.pdf',
      size: 245000,
      type: 'pdf',
      url: '/files/timeline.pdf'
    }
  }
];

const mockChats: WhatsAppChat[] = [
  {
    id: 'C001',
    leadId: 'L001',
    lead: mockLeads[0],
    lastMessage: mockMessages[3],
    unreadCount: 0,
    isPinned: true,
    isArchived: false,
    tags: ['urgent', 'proposal'],
    createdAt: new Date(2024, 0, 15)
  },
  {
    id: 'C002',
    leadId: 'L002',
    lead: mockLeads[1],
    lastMessage: mockMessages[0],
    unreadCount: 2,
    isPinned: false,
    isArchived: false,
    tags: ['follow-up'],
    createdAt: new Date(2024, 0, 12)
  }
];

const quickReplies: QuickReply[] = [
  { id: '1', text: 'Thanks for your message!', category: 'greeting' },
  { id: '2', text: 'I\'ll get back to you shortly.', category: 'greeting' },
  { id: '3', text: 'Can you provide more details?', category: 'question' },
  { id: '4', text: 'What\'s your timeline for this project?', category: 'question' },
  { id: '5', text: 'Let me prepare that information for you.', category: 'closing' },
  { id: '6', text: 'Have a great day! 😊', category: 'closing' }
];

const whatsappTemplates: WhatsAppTemplate[] = [
  {
    id: 'T001',
    name: 'Welcome Message',
    content: 'Hi {{1}}, welcome to {{2}}! We\'re excited to help you with your {{3}} project.',
    category: 'greeting',
    variables: ['contact_name', 'company_name', 'project_type'],
    isApproved: true
  },
  {
    id: 'T002',
    name: 'Proposal Follow-up',
    content: 'Hi {{1}}, I wanted to follow up on the proposal we sent for your {{2}} project. Do you have any questions?',
    category: 'follow-up',
    variables: ['contact_name', 'project_type'],
    isApproved: true
  }
];

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    const minutes = Math.floor(diffInHours * 60);
    return `${minutes}m`;
  } else if (diffInHours < 24) {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

function getMessageStatusIcon(status: WhatsAppMessage['status']) {
  switch (status) {
    case 'sent': return Check;
    case 'delivered': return CheckCircle;
    case 'read': return CheckCircle;
    case 'failed': return X;
    case 'pending': return Clock;
    default: return Check;
  }
}

function getMessageStatusColor(status: WhatsAppMessage['status']) {
  switch (status) {
    case 'sent': return 'text-gray-400';
    case 'delivered': return 'text-gray-500';
    case 'read': return 'text-blue-500';
    case 'failed': return 'text-red-500';
    case 'pending': return 'text-amber-500';
    default: return 'text-gray-400';
  }
}

function ChatListItem({ chat, isSelected, onClick }: {
  chat: WhatsAppChat;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-start space-x-3 p-3 cursor-pointer transition-colors hover:bg-gray-50",
        isSelected && "bg-blue-50 border-r-2 border-blue-500"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
            {getInitials(chat.lead.contact)}
          </AvatarFallback>
        </Avatar>
        {chat.unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-emerald-500">
            {chat.unreadCount}
          </Badge>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-sm truncate">{chat.lead.contact}</h4>
            {chat.isPinned && <Pin className="h-3 w-3 text-gray-400" />}
          </div>
          <span className="text-xs text-gray-500">{formatTimestamp(chat.lastMessage.timestamp)}</span>
        </div>
        
        <p className="text-xs text-gray-500 truncate mb-1">{chat.lead.company}</p>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700 truncate flex-1">
            {chat.lastMessage.type === 'text' 
              ? chat.lastMessage.content 
              : chat.lastMessage.type === 'document' 
                ? '📄 Document' 
                : chat.lastMessage.type === 'image' 
                  ? '📷 Image'
                  : '📎 Attachment'
            }
          </p>
          
          {chat.lastMessage.direction === 'outbound' && (
            <div className="ml-2">
              {(() => {
                const StatusIcon = getMessageStatusIcon(chat.lastMessage.status);
                return (
                  <StatusIcon className={cn("h-3 w-3", getMessageStatusColor(chat.lastMessage.status))} />
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message, onReply }: {
  message: WhatsAppMessage;
  onReply?: () => void;
}) {
  const isOutbound = message.direction === 'outbound';
  const StatusIcon = getMessageStatusIcon(message.status);
  
  return (
    <div className={cn("flex mb-4", isOutbound ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl",
        isOutbound 
          ? "bg-emerald-500 text-white rounded-br-sm" 
          : "bg-white border rounded-bl-sm shadow-sm"
      )}>
        {message.replyTo && (
          <div className={cn(
            "text-xs opacity-75 mb-2 p-2 rounded border-l-2",
            isOutbound ? "border-emerald-300 bg-emerald-600" : "border-gray-300 bg-gray-50"
          )}>
            <div className="font-semibold">{message.replyTo.sender}</div>
            <div>{message.replyTo.content}</div>
          </div>
        )}
        
        {message.type === 'text' && (
          <p className="text-sm">{message.content}</p>
        )}
        
        {message.type === 'document' && message.attachment && (
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8" />
            <div>
              <p className="text-sm font-medium">{message.attachment.name}</p>
              <p className="text-xs opacity-75">
                {(message.attachment.size / 1024).toFixed(1)}KB
              </p>
            </div>
          </div>
        )}
        
        {message.type === 'image' && message.attachment && (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={message.attachment.url} 
              alt={message.attachment.name}
              className="max-w-full h-auto"
            />
          </div>
        )}
        
        <div className={cn(
          "flex items-center justify-end space-x-1 mt-1",
          isOutbound ? "text-emerald-100" : "text-gray-500"
        )}>
          <span className="text-xs">{formatTimestamp(message.timestamp)}</span>
          {isOutbound && (
            <StatusIcon className={cn("h-3 w-3", getMessageStatusColor(message.status))} />
          )}
        </div>
      </div>
      
      {!isOutbound && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onReply}>
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Forward className="h-4 w-4 mr-2" />
              Forward
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

function QuickRepliesPanel({ replies, onSelect }: {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}) {
  const categories = Array.from(new Set(replies.map(r => r.category)));
  
  return (
    <div className="p-3 border-t bg-gray-50">
      <h4 className="text-sm font-medium mb-2">Quick Replies</h4>
      <div className="space-y-2">
        {categories.map(category => (
          <div key={category} className="space-y-1">
            <p className="text-xs text-gray-500 capitalize font-medium">{category}</p>
            <div className="flex flex-wrap gap-1">
              {replies
                .filter(r => r.category === category)
                .map(reply => (
                  <Button
                    key={reply.id}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => onSelect(reply)}
                  >
                    {reply.text}
                  </Button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhatsAppChat() {
  const [selectedChat, setSelectedChat] = useState<WhatsAppChat | null>(mockChats[0]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredChats = useMemo(() => {
    return mockChats.filter(chat =>
      chat.lead.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const chatMessages = useMemo(() => {
    if (!selectedChat) return [];
    return mockMessages.filter(msg => msg.chatId === selectedChat.id);
  }, [selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    
    // Here you would typically send the message to your API
    console.log('Sending message:', message, 'to chat:', selectedChat.id);
    setMessage('');
    setShowQuickReplies(false);
  };

  const handleQuickReply = (reply: QuickReply) => {
    setMessage(reply.text);
    setShowQuickReplies(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <TooltipProvider>
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">WhatsApp Business</h1>
              <Badge className="bg-emerald-500 hover:bg-emerald-600">
                {mockChats.reduce((sum, chat) => sum + chat.unreadCount, 0)} unread
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Chat List Sidebar */}
          <div className="w-80 bg-white border-r flex flex-col">
            {/* Search */}
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search chats..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Chat List */}
            <ScrollArea className="flex-1">
              {filteredChats.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500">No chats found</p>
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <ChatListItem
                    key={chat.id}
                    chat={chat}
                    isSelected={selectedChat?.id === chat.id}
                    onClick={() => setSelectedChat(chat)}
                  />
                ))
              )}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="bg-white border-b p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
                        {getInitials(selectedChat.lead.contact)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedChat.lead.contact}</h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500">{selectedChat.lead.company}</p>
                        <Badge variant="outline" className="text-xs">
                          {selectedChat.lead.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Tooltip content="Voice Call">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                    
                    <Tooltip content="Video Call">
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                    
                    <Tooltip content="Chat Info">
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Star className="h-4 w-4 mr-2" />
                          Star Chat
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pin className="h-4 w-4 mr-2" />
                          Pin Chat
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {selectedChat.tags.length > 0 && (
                  <div className="flex space-x-1 mt-2">
                    {selectedChat.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-1">
                  {chatMessages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      onReply={() => {}}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Replies Panel */}
              {showQuickReplies && (
                <QuickRepliesPanel
                  replies={quickReplies}
                  onSelect={handleQuickReply}
                />
              )}

              {/* Message Input */}
              <div className="bg-white border-t p-4">
                <div className="flex items-end space-x-2">
                  <div className="flex space-x-1">
                    <Tooltip content="Attach File">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                    
                    <Tooltip content="Send Image">
                      <Button variant="ghost" size="sm">
                        <Image className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setShowTemplates(true)}>
                          <FileText className="h-4 w-4 mr-2" />
                          Use Template
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowQuickReplies(!showQuickReplies)}>
                          <Zap className="h-4 w-4 mr-2" />
                          Quick Replies
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MapPin className="h-4 w-4 mr-2" />
                          Send Location
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex-1 relative">
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="resize-none min-h-0 py-3 pr-12"
                      rows={1}
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {message.trim() ? (
                    <Button onClick={handleSendMessage} className="bg-emerald-500 hover:bg-emerald-600">
                      <Send className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant={isRecording ? "destructive" : "outline"}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">WhatsApp Business</h3>
                <p className="text-gray-500">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Templates Dialog */}
        <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>WhatsApp Templates</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {whatsappTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{template.name}</h4>
                          <Badge 
                            className={template.isApproved ? "bg-emerald-500" : "bg-amber-500"}
                          >
                            {template.isApproved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{template.content}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>Variables: {template.variables.join(', ')}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setMessage(template.content);
                          setShowTemplates(false);
                        }}
                      >
                        Use
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default WhatsAppChat;