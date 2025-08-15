'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Smile,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Search,
  Filter,
  Settings,
  Users,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Archive,
  Trash2,
  User,
  Bot,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface ChatConversation {
  id: string;
  contactName: string;
  contactEmail: string;
  contactAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'waiting' | 'resolved' | 'assigned';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedAgent?: string;
  tags: string[];
  source: 'website' | 'mobile' | 'email' | 'social';
  leadScore?: number;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'agent' | 'bot';
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
  messageType: 'text' | 'image' | 'file' | 'system';
}

const mockConversations: ChatConversation[] = [
  {
    id: 'C001',
    contactName: 'Sarah Martinez',
    contactEmail: 'sarah.m@email.com',
    contactAvatar: '/avatars/sarah-m.jpg',
    lastMessage: 'I\'m interested in your commercial building services. Can you provide more details?',
    lastMessageTime: '2 min ago',
    unreadCount: 2,
    status: 'active',
    priority: 'high',
    assignedAgent: 'Mike Johnson',
    tags: ['commercial', 'new-lead'],
    source: 'website',
    leadScore: 85
  },
  {
    id: 'C002',
    contactName: 'John Davis',
    contactEmail: 'john.davis@company.com',
    contactAvatar: '/avatars/john-d.jpg',
    lastMessage: 'Thank you for the quick response!',
    lastMessageTime: '15 min ago',
    unreadCount: 0,
    status: 'resolved',
    priority: 'medium',
    assignedAgent: 'Lisa Wang',
    tags: ['residential', 'follow-up'],
    source: 'mobile',
    leadScore: 72
  },
  {
    id: 'C003',
    contactName: 'Emily Chen',
    contactEmail: 'emily.chen@startup.com',
    contactAvatar: '/avatars/emily-c.jpg',
    lastMessage: 'Bot: I\'ve connected you with a human agent. Please wait...',
    lastMessageTime: '1 hour ago',
    unreadCount: 1,
    status: 'waiting',
    priority: 'medium',
    tags: ['office-space', 'startup'],
    source: 'website',
    leadScore: 68
  }
];

const mockMessages: ChatMessage[] = [
  {
    id: 'M001',
    senderId: 'customer-001',
    senderName: 'Sarah Martinez',
    senderType: 'customer',
    content: 'Hi, I\'m looking for commercial building services for my new restaurant.',
    timestamp: '10:30 AM',
    isRead: true,
    messageType: 'text'
  },
  {
    id: 'M002',
    senderId: 'agent-mike',
    senderName: 'Mike Johnson',
    senderType: 'agent',
    content: 'Hello Sarah! I\'d be happy to help you with commercial building services. What type of restaurant are you planning to build?',
    timestamp: '10:32 AM',
    isRead: true,
    messageType: 'text'
  },
  {
    id: 'M003',
    senderId: 'customer-001',
    senderName: 'Sarah Martinez',
    senderType: 'customer',
    content: 'It\'s going to be a mid-scale Italian restaurant, around 2500 sq ft. Do you have experience with restaurant construction?',
    timestamp: '10:35 AM',
    isRead: true,
    messageType: 'text'
  },
  {
    id: 'M004',
    senderId: 'agent-mike',
    senderName: 'Mike Johnson',
    senderType: 'agent',
    content: 'Absolutely! We\'ve completed over 50 restaurant projects in the past 3 years. I can share our portfolio with you. Would you prefer to schedule a call to discuss your specific requirements?',
    timestamp: '10:37 AM',
    isRead: false,
    messageType: 'text'
  }
];

function getStatusColor(status: ChatConversation['status']) {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'waiting': return 'bg-yellow-100 text-yellow-800';
    case 'resolved': return 'bg-gray-100 text-gray-800';
    case 'assigned': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPriorityColor(priority: ChatConversation['priority']) {
  switch (priority) {
    case 'urgent': return 'text-red-600';
    case 'high': return 'text-orange-600';
    case 'medium': return 'text-yellow-600';
    case 'low': return 'text-green-600';
    default: return 'text-gray-600';
  }
}

export default function LiveChat() {
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAgentOnline, setIsAgentOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="h-[calc(100vh-120px)] flex">
      {/* Conversation List */}
      <div className="w-80 border-r bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Live Chat</h2>
            <div className="flex items-center space-x-2">
              <div className={cn(
                "flex items-center space-x-1 text-xs px-2 py-1 rounded-full",
                isAgentOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              )}>
                <div className={cn("w-2 h-2 rounded-full", isAgentOnline ? "bg-green-500" : "bg-red-500")} />
                <span>{isAgentOnline ? 'Online' : 'Offline'}</span>
              </div>
              <Switch checked={isAgentOnline} onCheckedChange={setIsAgentOnline} />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conversations</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors",
                selectedConversation.id === conversation.id && "bg-blue-50 border-blue-200"
              )}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.contactAvatar} />
                    <AvatarFallback>
                      {conversation.contactName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.leadScore && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.leadScore}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">{conversation.contactName}</h4>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs h-4 w-4 rounded-full p-0 flex items-center justify-center">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      <Badge className={cn("text-xs", getStatusColor(conversation.status))}>
                        {conversation.status}
                      </Badge>
                      <div className={cn("text-xs font-medium", getPriorityColor(conversation.priority))}>
                        {conversation.priority.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {conversation.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.contactAvatar} />
                <AvatarFallback>
                  {selectedConversation.contactName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedConversation.contactName}</h3>
                <p className="text-sm text-gray-600">{selectedConversation.contactEmail}</p>
              </div>
              {selectedConversation.leadScore && (
                <Badge className="bg-blue-100 text-blue-800">
                  Score: {selectedConversation.leadScore}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star className="h-4 w-4 mr-2" />
                    Add to Favorites
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Chat
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.senderType === 'customer' ? 'justify-start' : 'justify-end'
              )}
            >
              <div
                className={cn(
                  "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                  message.senderType === 'customer' 
                    ? 'bg-white border text-gray-900'
                    : message.senderType === 'bot'
                    ? 'bg-yellow-100 border border-yellow-200 text-yellow-900'
                    : 'bg-blue-600 text-white'
                )}
              >
                {message.senderType !== 'customer' && (
                  <div className="flex items-center space-x-1 mb-1">
                    {message.senderType === 'bot' && <Bot className="h-3 w-3" />}
                    <span className="text-xs font-medium opacity-75">
                      {message.senderName}
                    </span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs opacity-75">{message.timestamp}</span>
                  {message.senderType === 'agent' && (
                    <div className="flex items-center space-x-1">
                      {message.isRead ? (
                        <CheckCircle2 className="h-3 w-3 opacity-75" />
                      ) : (
                        <Clock className="h-3 w-3 opacity-75" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-end space-x-2">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Smile className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[40px] max-h-32 resize-none"
                rows={1}
              />
            </div>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Quick Responses */}
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-xs text-gray-500">Quick replies:</span>
            <Button variant="outline" size="sm" className="text-xs h-6">
              Thanks for contacting us!
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-6">
              I'll get back to you shortly
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-6">
              Can you provide more details?
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Info Sidebar */}
      <div className="w-80 border-l bg-white p-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="text-center">
            <Avatar className="h-16 w-16 mx-auto mb-2">
              <AvatarImage src={selectedConversation.contactAvatar} />
              <AvatarFallback className="text-xl">
                {selectedConversation.contactName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">{selectedConversation.contactName}</h3>
            <p className="text-sm text-gray-600">{selectedConversation.contactEmail}</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Badge className={cn("mt-1", getStatusColor(selectedConversation.status))}>
                {selectedConversation.status}
              </Badge>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <p className={cn("mt-1 text-sm font-medium", getPriorityColor(selectedConversation.priority))}>
                {selectedConversation.priority.toUpperCase()}
              </p>
            </div>
            
            {selectedConversation.leadScore && (
              <div>
                <label className="text-sm font-medium text-gray-700">Lead Score</label>
                <div className="mt-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${selectedConversation.leadScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{selectedConversation.leadScore}</span>
                </div>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-gray-700">Tags</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedConversation.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Source</label>
              <p className="mt-1 text-sm capitalize">{selectedConversation.source}</p>
            </div>
            
            {selectedConversation.assignedAgent && (
              <div>
                <label className="text-sm font-medium text-gray-700">Assigned Agent</label>
                <p className="mt-1 text-sm">{selectedConversation.assignedAgent}</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t">
            <Button className="w-full" size="sm">
              <User className="h-4 w-4 mr-2" />
              View Full Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}