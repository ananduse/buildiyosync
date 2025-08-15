import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Search,
  Filter,
  RefreshCw,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  FileText,
  StickyNote,
  BookOpen,
  Users,
  User,
  UserCheck,
  Clock,
  Calendar,
  Star,
  StarOff,
  Pin,
  PinOff,
  Share,
  Copy,
  Download,
  Upload,
  Tag,
  Hash,
  AtSign,
  MessageSquare,
  Reply,
  Heart,
  ThumbsUp,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Paperclip,
  Image,
  File,
  Link,
  Archive,
  Folder,
  FolderOpen,
  Grid,
  List,
  Calendar as CalendarIcon,
  TrendingUp,
  Activity,
  Bell,
  BellOff,
  Lock,
  Unlock,
  Globe,
  Shield
} from 'lucide-react';

interface SharedNote {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  collaborators: {
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'editor' | 'viewer';
    lastViewed?: string;
  }[];
  tags: string[];
  category: string;
  visibility: 'public' | 'team' | 'private';
  isPinned: boolean;
  isFavorited: boolean;
  isArchived: boolean;
  attachments: NoteAttachment[];
  comments: NoteComment[];
  version: number;
  lastEditedBy: string;
  createdAt: string;
  updatedAt: string;
  linkedLeads: string[];
  linkedDeals: string[];
  metadata: {
    wordCount: number;
    readTime: number;
    viewCount: number;
    shareCount: number;
  };
}

interface NoteAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'link' | 'file';
  url: string;
  size?: number;
  uploadedBy: string;
  uploadedAt: string;
}

interface NoteComment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt?: string;
  replies: NoteComment[];
  reactions: {
    type: 'like' | 'love' | 'helpful';
    count: number;
    users: string[];
  }[];
}

interface NoteCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  noteCount: number;
  isDefault: boolean;
}

interface NoteStats {
  totalNotes: number;
  activeNotes: number;
  sharedNotes: number;
  pinnedNotes: number;
  archivedNotes: number;
  totalViews: number;
  totalComments: number;
  collaboratorsCount: number;
}

const SharedNotes: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('notes');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [selectedNote, setSelectedNote] = useState<SharedNote | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // Mock data for shared notes
  const sharedNotes: SharedNote[] = [
    {
      id: 'note-001',
      title: 'Q1 Sales Strategy Meeting Notes',
      content: 'Detailed notes from the Q1 sales strategy meeting including action items, goals, and team assignments. Key points discussed: 1. Revenue targets for Q1 2. New product launches 3. Territory assignments 4. Training programs',
      excerpt: 'Detailed notes from the Q1 sales strategy meeting including action items, goals, and team assignments.',
      author: {
        id: 'user-001',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com'
      },
      collaborators: [
        {
          id: 'user-002',
          name: 'Mike Chen',
          email: 'mike.chen@company.com',
          role: 'editor',
          lastViewed: '2024-01-15T16:30:00Z'
        },
        {
          id: 'user-003',
          name: 'Lisa Johnson',
          email: 'lisa.johnson@company.com',
          role: 'viewer',
          lastViewed: '2024-01-15T14:20:00Z'
        }
      ],
      tags: ['meeting', 'strategy', 'Q1', 'sales'],
      category: 'Meetings',
      visibility: 'team',
      isPinned: true,
      isFavorited: false,
      isArchived: false,
      attachments: [
        {
          id: 'att-001',
          name: 'Q1-Strategy-Presentation.pdf',
          type: 'document',
          url: '/files/q1-strategy.pdf',
          size: 2048576,
          uploadedBy: 'user-001',
          uploadedAt: '2024-01-15T10:00:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-001',
          content: 'Great summary! I think we should also add the timeline for product launches.',
          author: {
            id: 'user-002',
            name: 'Mike Chen'
          },
          createdAt: '2024-01-15T17:00:00Z',
          replies: [],
          reactions: [
            {
              type: 'like',
              count: 3,
              users: ['user-001', 'user-003', 'user-004']
            }
          ]
        }
      ],
      version: 3,
      lastEditedBy: 'user-001',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T16:45:00Z',
      linkedLeads: ['lead-123', 'lead-456'],
      linkedDeals: ['deal-789'],
      metadata: {
        wordCount: 1247,
        readTime: 5,
        viewCount: 23,
        shareCount: 5
      }
    },
    {
      id: 'note-002',
      title: 'Client Onboarding Best Practices',
      content: 'Comprehensive guide for onboarding new clients including checklists, templates, and common pitfalls to avoid. This document should be referenced by all team members when working with new clients.',
      excerpt: 'Comprehensive guide for onboarding new clients including checklists, templates, and common pitfalls.',
      author: {
        id: 'user-003',
        name: 'Lisa Johnson',
        email: 'lisa.johnson@company.com'
      },
      collaborators: [
        {
          id: 'user-001',
          name: 'Sarah Wilson',
          email: 'sarah.wilson@company.com',
          role: 'editor'
        },
        {
          id: 'user-004',
          name: 'Alex Turner',
          email: 'alex.turner@company.com',
          role: 'viewer'
        }
      ],
      tags: ['onboarding', 'process', 'clients', 'best-practices'],
      category: 'Processes',
      visibility: 'public',
      isPinned: false,
      isFavorited: true,
      isArchived: false,
      attachments: [
        {
          id: 'att-002',
          name: 'Onboarding-Checklist.xlsx',
          type: 'document',
          url: '/files/onboarding-checklist.xlsx',
          size: 1024000,
          uploadedBy: 'user-003',
          uploadedAt: '2024-01-10T09:30:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-002',
          content: 'This is incredibly helpful! Can we add a section about follow-up schedules?',
          author: {
            id: 'user-004',
            name: 'Alex Turner'
          },
          createdAt: '2024-01-12T11:15:00Z',
          replies: [
            {
              id: 'reply-001',
              content: 'Absolutely! I\'ll add that section this week.',
              author: {
                id: 'user-003',
                name: 'Lisa Johnson'
              },
              createdAt: '2024-01-12T14:30:00Z',
              replies: [],
              reactions: []
            }
          ],
          reactions: [
            {
              type: 'helpful',
              count: 2,
              users: ['user-001', 'user-003']
            }
          ]
        }
      ],
      version: 2,
      lastEditedBy: 'user-003',
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-12T15:00:00Z',
      linkedLeads: [],
      linkedDeals: [],
      metadata: {
        wordCount: 2156,
        readTime: 8,
        viewCount: 45,
        shareCount: 12
      }
    },
    {
      id: 'note-003',
      title: 'Competitor Analysis - TechCorp',
      content: 'Detailed analysis of TechCorp including their strengths, weaknesses, pricing strategy, and market positioning. This information should be used when competing against them in deals.',
      excerpt: 'Detailed analysis of TechCorp including their strengths, weaknesses, pricing strategy, and market positioning.',
      author: {
        id: 'user-002',
        name: 'Mike Chen',
        email: 'mike.chen@company.com'
      },
      collaborators: [
        {
          id: 'user-001',
          name: 'Sarah Wilson',
          email: 'sarah.wilson@company.com',
          role: 'editor'
        }
      ],
      tags: ['competitor', 'analysis', 'techcorp', 'market-research'],
      category: 'Research',
      visibility: 'team',
      isPinned: false,
      isFavorited: false,
      isArchived: false,
      attachments: [],
      comments: [],
      version: 1,
      lastEditedBy: 'user-002',
      createdAt: '2024-01-08T14:20:00Z',
      updatedAt: '2024-01-08T14:20:00Z',
      linkedLeads: ['lead-789'],
      linkedDeals: ['deal-456'],
      metadata: {
        wordCount: 987,
        readTime: 4,
        viewCount: 18,
        shareCount: 3
      }
    },
    {
      id: 'note-004',
      title: 'Personal CRM Tips and Tricks',
      content: 'Personal notes on effective CRM usage, keyboard shortcuts, automation tips, and workflow optimizations that have improved my productivity.',
      excerpt: 'Personal notes on effective CRM usage, keyboard shortcuts, automation tips, and workflow optimizations.',
      author: {
        id: 'user-004',
        name: 'Alex Turner',
        email: 'alex.turner@company.com'
      },
      collaborators: [],
      tags: ['productivity', 'crm', 'tips', 'personal'],
      category: 'Personal',
      visibility: 'private',
      isPinned: false,
      isFavorited: true,
      isArchived: false,
      attachments: [],
      comments: [],
      version: 1,
      lastEditedBy: 'user-004',
      createdAt: '2024-01-05T11:00:00Z',
      updatedAt: '2024-01-14T16:30:00Z',
      linkedLeads: [],
      linkedDeals: [],
      metadata: {
        wordCount: 654,
        readTime: 3,
        viewCount: 8,
        shareCount: 0
      }
    }
  ];

  // Mock categories
  const categories: NoteCategory[] = [
    {
      id: 'cat-001',
      name: 'Meetings',
      description: 'Meeting notes and action items',
      color: 'bg-blue-100 text-blue-800',
      noteCount: 8,
      isDefault: false
    },
    {
      id: 'cat-002',
      name: 'Processes',
      description: 'Standard operating procedures and workflows',
      color: 'bg-green-100 text-green-800',
      noteCount: 12,
      isDefault: false
    },
    {
      id: 'cat-003',
      name: 'Research',
      description: 'Market research and competitive analysis',
      color: 'bg-purple-100 text-purple-800',
      noteCount: 6,
      isDefault: false
    },
    {
      id: 'cat-004',
      name: 'Personal',
      description: 'Personal notes and ideas',
      color: 'bg-orange-100 text-orange-800',
      noteCount: 15,
      isDefault: true
    }
  ];

  // Mock stats
  const stats: NoteStats = {
    totalNotes: 41,
    activeNotes: 38,
    sharedNotes: 26,
    pinnedNotes: 3,
    archivedNotes: 3,
    totalViews: 342,
    totalComments: 67,
    collaboratorsCount: 12
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return Globe;
      case 'team': return Users;
      case 'private': return Lock;
      default: return FileText;
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'text-green-600';
      case 'team': return 'text-blue-600';
      case 'private': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'image': return Image;
      case 'document': return File;
      case 'link': return Link;
      default: return Paperclip;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredNotes = sharedNotes.filter(note => {
    if (note.isArchived && !showArchived) return false;
    
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || note.category === categoryFilter;
    const matchesVisibility = visibilityFilter === 'all' || note.visibility === visibilityFilter;
    
    return matchesSearch && matchesCategory && matchesVisibility;
  });

  const createNote = () => {
    setIsCreating(true);
  };

  const editNote = (noteId: string) => {
    const note = sharedNotes.find(n => n.id === noteId);
    setSelectedNote(note || null);
  };

  const togglePin = (noteId: string) => {
    console.log(`Toggling pin for note: ${noteId}`);
  };

  const toggleFavorite = (noteId: string) => {
    console.log(`Toggling favorite for note: ${noteId}`);
  };

  const shareNote = (noteId: string) => {
    console.log(`Sharing note: ${noteId}`);
  };

  const archiveNote = (noteId: string) => {
    console.log(`Archiving note: ${noteId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shared Notes</h1>
          <p className="text-muted-foreground">Collaborate on notes and share knowledge across the team</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
            <Archive className="h-4 w-4 text-gray-600" />
            <span className="text-sm">Show Archived:</span>
            <Switch
              checked={showArchived}
              onCheckedChange={setShowArchived}
            />
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={createNote}>
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Notes</p>
                <p className="text-2xl font-bold">{stats.totalNotes}</p>
                <p className="text-xs text-muted-foreground">{stats.activeNotes} active</p>
              </div>
              <StickyNote className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Shared Notes</p>
                <p className="text-2xl font-bold">{stats.sharedNotes}</p>
                <p className="text-xs text-muted-foreground">{stats.collaboratorsCount} collaborators</p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+15% this week</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comments</p>
                <p className="text-2xl font-bold">{stats.totalComments}</p>
                <p className="text-xs text-muted-foreground">{stats.pinnedNotes} pinned</p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="notes">All Notes</TabsTrigger>
          <TabsTrigger value="shared">Shared with Me</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes, tags, content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Notes Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => {
                const VisibilityIcon = getVisibilityIcon(note.visibility);
                
                return (
                  <Card key={note.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {note.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                            {note.isFavorited && <Star className="h-4 w-4 text-yellow-600 fill-current" />}
                            <VisibilityIcon className={`h-4 w-4 ${getVisibilityColor(note.visibility)}`} />
                          </div>
                          <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(note.category)}>
                              {note.category}
                            </Badge>
                            {note.isArchived && (
                              <Badge variant="outline" className="text-gray-600">
                                Archived
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">{note.excerpt}</p>
                      
                      {/* Tags */}
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {note.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                          {note.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{note.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      {/* Metadata */}
                      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                        <div>
                          <span>Words: {note.metadata.wordCount}</span>
                        </div>
                        <div>
                          <span>Read: {note.metadata.readTime}m</span>
                        </div>
                        <div>
                          <span>Views: {note.metadata.viewCount}</span>
                        </div>
                        <div>
                          <span>Comments: {note.comments.length}</span>
                        </div>
                      </div>
                      
                      {/* Attachments */}
                      {note.attachments.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-muted-foreground">
                            {note.attachments.length} attachment(s)
                          </span>
                        </div>
                      )}
                      
                      {/* Author and Date */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-3 w-3" />
                          </div>
                          <span>{note.author.name}</span>
                        </div>
                        <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                      </div>
                      
                      {/* Collaborators */}
                      {note.collaborators.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-gray-400" />
                          <div className="flex items-center gap-1">
                            {note.collaborators.slice(0, 3).map((collab, index) => (
                              <div key={collab.id} className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xs">{index + 1}</span>
                              </div>
                            ))}
                            {note.collaborators.length > 3 && (
                              <span className="text-xs text-muted-foreground">+{note.collaborators.length - 3}</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePin(note.id)}
                          >
                            {note.isPinned ? (
                              <PinOff className="h-3 w-3" />
                            ) : (
                              <Pin className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(note.id)}
                          >
                            {note.isFavorited ? (
                              <StarOff className="h-3 w-3" />
                            ) : (
                              <Star className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => shareNote(note.id)}
                          >
                            <Share className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editNote(note.id)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotes.map((note) => {
                const VisibilityIcon = getVisibilityIcon(note.visibility);
                
                return (
                  <Card key={note.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-gray-600" />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              {note.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                              {note.isFavorited && <Star className="h-4 w-4 text-yellow-600 fill-current" />}
                              <VisibilityIcon className={`h-4 w-4 ${getVisibilityColor(note.visibility)}`} />
                              <h3 className="text-lg font-semibold">{note.title}</h3>
                              <Badge className={getCategoryColor(note.category)}>
                                {note.category}
                              </Badge>
                              {note.isArchived && (
                                <Badge variant="outline" className="text-gray-600">
                                  Archived
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-muted-foreground line-clamp-2">{note.excerpt}</p>
                            
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <span>By {note.author.name}</span>
                              <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
                              <span>{note.metadata.wordCount} words</span>
                              <span>{note.metadata.viewCount} views</span>
                              <span>{note.comments.length} comments</span>
                              {note.attachments.length > 0 && (
                                <span>{note.attachments.length} attachments</span>
                              )}
                            </div>
                            
                            {note.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {note.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePin(note.id)}
                          >
                            {note.isPinned ? (
                              <PinOff className="h-4 w-4" />
                            ) : (
                              <Pin className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(note.id)}
                          >
                            {note.isFavorited ? (
                              <StarOff className="h-4 w-4" />
                            ) : (
                              <Star className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editNote(note.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <StickyNote className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No Notes Found</h3>
              <p className="text-gray-600 mt-2">
                {searchTerm ? 'Try adjusting your search criteria' : 'Create your first shared note to get started'}
              </p>
              {!searchTerm && (
                <Button className="mt-4" onClick={createNote}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Note
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="shared" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notes Shared with Me</CardTitle>
              <CardDescription>Notes that other team members have shared with you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedNotes
                  .filter(note => note.collaborators.some(c => c.id !== note.author.id))
                  .map((note) => (
                    <div key={note.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{note.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Shared by {note.author.name} • {note.collaborators.find(c => c.id !== note.author.id)?.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(note.category)}>
                          {note.category}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Notes</CardTitle>
              <CardDescription>Notes you've marked as favorites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedNotes
                  .filter(note => note.isFavorited)
                  .map((note) => (
                    <div key={note.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <div>
                          <p className="font-medium">{note.title}</p>
                          <p className="text-sm text-muted-foreground">
                            By {note.author.name} • Updated {new Date(note.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(note.category)}>
                          {note.category}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Note Categories</CardTitle>
                  <CardDescription>Organize your notes with categories</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Folder className="h-6 w-6 text-gray-600" />
                            <div>
                              <h3 className="font-semibold">{category.name}</h3>
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={category.color}>
                            {category.noteCount} notes
                          </Badge>
                          {category.isDefault && (
                            <Badge variant="outline" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-3 w-3 mr-2" />
                          View Notes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Note Activity</CardTitle>
                <CardDescription>Views and engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Activity timeline chart</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Track note views, comments, and shares over time
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Notes by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.noteCount} notes</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(category.noteCount / stats.totalNotes) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Notes</CardTitle>
                <CardDescription>Most viewed and shared notes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sharedNotes
                    .sort((a, b) => b.metadata.viewCount - a.metadata.viewCount)
                    .slice(0, 5)
                    .map((note, index) => (
                      <div key={note.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="w-6 h-6 flex items-center justify-center p-0">
                            {index + 1}
                          </Badge>
                          <span className="font-medium truncate">{note.title}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {note.metadata.viewCount} views
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collaboration Stats</CardTitle>
                <CardDescription>Team collaboration metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-lg font-bold">{stats.collaboratorsCount}</p>
                    <p className="text-sm text-blue-700">Active Collaborators</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{stats.sharedNotes}</p>
                      <p className="text-sm text-muted-foreground">Shared Notes</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalComments}</p>
                      <p className="text-sm text-muted-foreground">Comments</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SharedNotes;