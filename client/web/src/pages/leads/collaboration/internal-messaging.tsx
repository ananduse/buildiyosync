import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search,
  Send,
  MessageSquare,
  MessageCircle,
  Users,
  User,
  UserPlus,
  Settings,
  Bell,
  BellOff,
  Pin,
  PinOff,
  Star,
  StarOff,
  Edit,
  Trash2,
  Reply,
  Forward,
  MoreVertical,
  Plus,
  X,
  Check,
  CheckCheck,
  Circle,
  Clock,
  Calendar,
  Paperclip,
  Image,
  File,
  Link,
  Smile,
  Hash,
  AtSign,
  Phone,
  Video,
  Archive,
  Unarchive,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Download,
  Upload,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Minimize2,
  Maximize2,
  Grid,
  List,
  Activity,
  TrendingUp
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status: 'online' | 'away' | 'busy' | 'offline';
  };
  recipients: string[];
  conversationId: string;
  type: 'text' | 'image' | 'file' | 'link' | 'system';
  attachments: MessageAttachment[];
  reactions: MessageReaction[];
  mentions: string[];
  isEdited: boolean;
  isDeleted: boolean;
  isPinned: boolean;
  replyTo?: string;
  readBy: {
    userId: string;
    readAt: string;
  }[];
  createdAt: string;
  updatedAt?: string;
  metadata?: {
    priority: 'low' | 'normal' | 'high' | 'urgent';
    tags: string[];
    linkedLeads: string[];
    linkedDeals: string[];
  };
}

interface Conversation {
  id: string;
  name?: string;
  type: 'direct' | 'group' | 'channel';
  participants: ConversationParticipant[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isArchived: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  settings: {
    description?: string;
    isPrivate: boolean;
    allowInvites: boolean;
    retentionDays?: number;
  };
}

interface ConversationParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
  status: 'online' | 'away' | 'busy' | 'offline';
  joinedAt: string;
  lastSeen?: string;
  permissions: string[];
}

interface MessageAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'link';
  url: string;
  size?: number;
  preview?: string;
  uploadedAt: string;
}

interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

interface MessageStats {
  totalMessages: number;
  totalConversations: number;
  activeUsers: number;
  messagesThisWeek: number;
  averageResponseTime: number;
  unreadMessages: number;
  pinnedMessages: number;
  archivedConversations: number;
}

const InternalMessaging: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('conversations');
  const [selectedConversation, setSelectedConversation] = useState<string | null>('conv-001');
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  // Mock data for conversations
  const conversations: Conversation[] = [
    {
      id: 'conv-001',
      name: 'Sales Team',
      type: 'group',
      participants: [
        {
          id: 'user-001',
          name: 'Sarah Wilson',
          email: 'sarah.wilson@company.com',
          role: 'admin',
          status: 'online',
          joinedAt: '2024-01-01T10:00:00Z',
          lastSeen: '2024-01-18T16:30:00Z',
          permissions: ['read', 'write', 'admin']
        },
        {
          id: 'user-002',
          name: 'Mike Chen',
          email: 'mike.chen@company.com',
          role: 'member',
          status: 'online',
          joinedAt: '2024-01-01T10:00:00Z',
          lastSeen: '2024-01-18T16:25:00Z',
          permissions: ['read', 'write']
        },
        {
          id: 'user-003',
          name: 'Lisa Johnson',
          email: 'lisa.johnson@company.com',
          role: 'member',
          status: 'away',
          joinedAt: '2024-01-01T10:00:00Z',
          lastSeen: '2024-01-18T15:45:00Z',
          permissions: ['read', 'write']
        }
      ],
      lastMessage: {
        id: 'msg-003',
        content: 'Great work on the Q1 numbers everyone! 🎉',
        author: {
          id: 'user-001',
          name: 'Sarah Wilson',
          email: 'sarah.wilson@company.com',
          status: 'online'
        },
        recipients: ['user-002', 'user-003'],
        conversationId: 'conv-001',
        type: 'text',
        attachments: [],
        reactions: [
          { emoji: '👍', count: 2, users: ['user-002', 'user-003'] }
        ],
        mentions: [],
        isEdited: false,
        isDeleted: false,
        isPinned: false,
        readBy: [
          { userId: 'user-002', readAt: '2024-01-18T16:25:00Z' }
        ],
        createdAt: '2024-01-18T16:20:00Z'
      },
      unreadCount: 0,
      isPinned: true,
      isMuted: false,
      isArchived: false,
      createdBy: 'user-001',
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-18T16:20:00Z',
      settings: {
        description: 'Main sales team communication channel',
        isPrivate: false,
        allowInvites: true,
        retentionDays: 90
      }
    },
    {
      id: 'conv-002',
      name: undefined,
      type: 'direct',
      participants: [
        {
          id: 'user-004',
          name: 'Alex Turner',
          email: 'alex.turner@company.com',
          role: 'member',
          status: 'busy',
          joinedAt: '2024-01-15T14:00:00Z',
          lastSeen: '2024-01-18T14:30:00Z',
          permissions: ['read', 'write']
        }
      ],
      lastMessage: {
        id: 'msg-004',
        content: 'Can you review the proposal before the meeting?',
        author: {
          id: 'user-004',
          name: 'Alex Turner',
          email: 'alex.turner@company.com',
          status: 'busy'
        },
        recipients: ['user-001'],
        conversationId: 'conv-002',
        type: 'text',
        attachments: [],
        reactions: [],
        mentions: [],
        isEdited: false,
        isDeleted: false,
        isPinned: false,
        readBy: [],
        createdAt: '2024-01-18T14:30:00Z'
      },
      unreadCount: 1,
      isPinned: false,
      isMuted: false,
      isArchived: false,
      createdBy: 'user-004',
      createdAt: '2024-01-15T14:00:00Z',
      updatedAt: '2024-01-18T14:30:00Z',
      settings: {
        isPrivate: true,
        allowInvites: false
      }
    },
    {
      id: 'conv-003',
      name: 'Lead Generation',
      type: 'channel',
      participants: [
        {
          id: 'user-003',
          name: 'Lisa Johnson',
          email: 'lisa.johnson@company.com',
          role: 'admin',
          status: 'away',
          joinedAt: '2024-01-10T09:00:00Z',
          lastSeen: '2024-01-18T15:45:00Z',
          permissions: ['read', 'write', 'admin']
        },
        {
          id: 'user-002',
          name: 'Mike Chen',
          email: 'mike.chen@company.com',
          role: 'member',
          status: 'online',
          joinedAt: '2024-01-10T09:00:00Z',
          lastSeen: '2024-01-18T16:25:00Z',
          permissions: ['read', 'write']
        }
      ],
      lastMessage: {
        id: 'msg-005',
        content: 'New lead qualification criteria document is ready',
        author: {
          id: 'user-003',
          name: 'Lisa Johnson',
          email: 'lisa.johnson@company.com',
          status: 'away'
        },
        recipients: ['user-002'],
        conversationId: 'conv-003',
        type: 'text',
        attachments: [
          {
            id: 'att-001',
            name: 'Lead-Qualification-Criteria.pdf',
            type: 'document',
            url: '/files/lead-qualification.pdf',
            size: 1024000,
            uploadedAt: '2024-01-18T15:45:00Z'
          }
        ],
        reactions: [],
        mentions: [],
        isEdited: false,
        isDeleted: false,
        isPinned: true,
        readBy: [],
        createdAt: '2024-01-18T15:45:00Z'
      },
      unreadCount: 2,
      isPinned: false,
      isMuted: false,
      isArchived: false,
      createdBy: 'user-003',
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-18T15:45:00Z',
      settings: {
        description: 'Lead generation strategies and updates',
        isPrivate: false,
        allowInvites: true,
        retentionDays: 365
      }
    }
  ];

  // Mock messages for selected conversation
  const messages: Message[] = [
    {
      id: 'msg-001',
      content: 'Hey team! Let\'s discuss the Q1 targets for this quarter.',
      author: {
        id: 'user-001',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        status: 'online'
      },
      recipients: ['user-002', 'user-003'],
      conversationId: 'conv-001',
      type: 'text',
      attachments: [],
      reactions: [
        { emoji: '👍', count: 2, users: ['user-002', 'user-003'] }
      ],
      mentions: [],
      isEdited: false,
      isDeleted: false,
      isPinned: false,
      readBy: [
        { userId: 'user-002', readAt: '2024-01-18T15:30:00Z' },
        { userId: 'user-003', readAt: '2024-01-18T15:35:00Z' }
      ],
      createdAt: '2024-01-18T15:15:00Z'
    },
    {
      id: 'msg-002',
      content: 'I\'ve prepared the initial analysis. We\'re on track to exceed our targets by 15%! 📈',
      author: {
        id: 'user-002',
        name: 'Mike Chen',
        email: 'mike.chen@company.com',
        status: 'online'
      },
      recipients: ['user-001', 'user-003'],
      conversationId: 'conv-001',
      type: 'text',
      attachments: [
        {
          id: 'att-002',
          name: 'Q1-Analysis.xlsx',
          type: 'document',
          url: '/files/q1-analysis.xlsx',
          size: 2048000,
          uploadedAt: '2024-01-18T15:50:00Z'
        }
      ],
      reactions: [
        { emoji: '🎉', count: 1, users: ['user-001'] },
        { emoji: '💪', count: 1, users: ['user-003'] }
      ],
      mentions: [],
      isEdited: false,
      isDeleted: false,
      isPinned: true,
      readBy: [
        { userId: 'user-001', readAt: '2024-01-18T16:00:00Z' }
      ],
      createdAt: '2024-01-18T15:50:00Z',
      metadata: {
        priority: 'high',
        tags: ['analysis', 'q1', 'targets'],
        linkedLeads: ['lead-123'],
        linkedDeals: ['deal-456']
      }
    },
    {
      id: 'msg-003',
      content: 'Great work on the Q1 numbers everyone! 🎉',
      author: {
        id: 'user-001',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        status: 'online'
      },
      recipients: ['user-002', 'user-003'],
      conversationId: 'conv-001',
      type: 'text',
      attachments: [],
      reactions: [
        { emoji: '👍', count: 2, users: ['user-002', 'user-003'] }
      ],
      mentions: [],
      isEdited: false,
      isDeleted: false,
      isPinned: false,
      readBy: [
        { userId: 'user-002', readAt: '2024-01-18T16:25:00Z' }
      ],
      createdAt: '2024-01-18T16:20:00Z'
    }
  ];

  // Mock stats
  const stats: MessageStats = {
    totalMessages: 1247,
    totalConversations: 23,
    activeUsers: 12,
    messagesThisWeek: 234,
    averageResponseTime: 8.5,
    unreadMessages: 15,
    pinnedMessages: 8,
    archivedConversations: 5
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case 'direct': return MessageCircle;
      case 'group': return Users;
      case 'channel': return Hash;
      default: return MessageSquare;
    }
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const createGroupConversation = () => {
    setIsCreatingGroup(true);
  };

  const addReaction = (messageId: string, emoji: string) => {
    console.log(`Adding reaction ${emoji} to message ${messageId}`);
  };

  const pinMessage = (messageId: string) => {
    console.log(`Pinning message ${messageId}`);
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-[calc(100vh-2rem)] flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={createGroupConversation}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {conversations
              .filter(conv => 
                conv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                conv.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .map((conversation) => {
                const ConvIcon = getConversationIcon(conversation.type);
                const displayName = conversation.name || 
                  (conversation.type === 'direct' 
                    ? conversation.participants[0]?.name 
                    : `${conversation.participants.length} participants`);
                
                return (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conversation.id 
                        ? 'bg-blue-100 border border-blue-200' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        {conversation.type === 'direct' ? (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <ConvIcon className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                        {conversation.type === 'direct' && (
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.participants[0]?.status)}`} />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{displayName}</p>
                            {conversation.isPinned && <Pin className="h-3 w-3 text-blue-600" />}
                            {conversation.isMuted && <VolumeX className="h-3 w-3 text-gray-400" />}
                          </div>
                          <div className="flex items-center gap-1">
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-blue-600 text-white">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {conversation.lastMessage && formatTime(conversation.lastMessage.createdAt)}
                            </span>
                          </div>
                        </div>
                        
                        {conversation.lastMessage && (
                          <div className="flex items-center gap-1 mt-1">
                            {conversation.lastMessage.author.id === 'current-user' && (
                              <div className="flex items-center">
                                {conversation.lastMessage.readBy.length > 0 ? (
                                  <CheckCheck className="h-3 w-3 text-blue-600" />
                                ) : (
                                  <Check className="h-3 w-3 text-gray-400" />
                                )}
                              </div>
                            )}
                            <p className="text-sm text-muted-foreground truncate">
                              {conversation.lastMessage.type === 'text' 
                                ? conversation.lastMessage.content 
                                : '📎 Attachment'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </ScrollArea>

        {/* Stats */}
        <div className="p-4 border-t bg-white">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm font-medium">{stats.unreadMessages}</p>
              <p className="text-xs text-muted-foreground">Unread</p>
            </div>
            <div>
              <p className="text-sm font-medium">{stats.activeUsers}</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {selectedConv.type === 'direct' ? (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                    {selectedConv.type === 'direct' && (
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedConv.participants[0]?.status)}`} />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">
                      {selectedConv.name || selectedConv.participants[0]?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConv.type === 'direct' 
                        ? selectedConv.participants[0]?.status
                        : `${selectedConv.participants.length} members`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => {
                  const isOwn = message.author.id === 'current-user';
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                        {!isOwn && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                        )}
                        
                        <div className={`space-y-1 ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                          {!isOwn && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{message.author.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(message.createdAt)}
                              </span>
                            </div>
                          )}
                          
                          <div
                            className={`p-3 rounded-lg ${
                              isOwn
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            {message.isPinned && (
                              <div className="flex items-center gap-1 mb-2">
                                <Pin className="h-3 w-3" />
                                <span className="text-xs font-medium">Pinned</span>
                              </div>
                            )}
                            
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            
                            {message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment) => (
                                  <div
                                    key={attachment.id}
                                    className={`flex items-center gap-2 p-2 rounded ${
                                      isOwn ? 'bg-blue-700' : 'bg-gray-200'
                                    }`}
                                  >
                                    <File className="h-4 w-4" />
                                    <span className="text-sm">{attachment.name}</span>
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {isOwn && (
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs opacity-70">
                                  {formatTime(message.createdAt)}
                                </span>
                                {message.readBy.length > 0 ? (
                                  <CheckCheck className="h-3 w-3" />
                                ) : (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                            )}
                          </div>
                          
                          {message.reactions.length > 0 && (
                            <div className="flex items-center gap-1">
                              {message.reactions.map((reaction) => (
                                <Button
                                  key={reaction.emoji}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2"
                                  onClick={() => addReaction(message.id, reaction.emoji)}
                                >
                                  <span className="text-xs">{reaction.emoji}</span>
                                  <span className="text-xs ml-1">{reaction.count}</span>
                                </Button>
                              ))}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <Smile className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="min-h-[60px] resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={sendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-gray-600 mt-2">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar (Conversation Info) */}
      {selectedConv && showUserList && (
        <div className="w-64 border-l bg-gray-50 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Participants</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowUserList(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {selectedConv.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${getStatusColor(participant.status)}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{participant.name}</p>
                      <p className="text-xs text-muted-foreground">{participant.status}</p>
                    </div>
                  </div>
                  {participant.role === 'admin' && (
                    <Badge variant="outline" className="text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            
            {selectedConv.settings.allowInvites && (
              <Button variant="outline" size="sm" className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InternalMessaging;