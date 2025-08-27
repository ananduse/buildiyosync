'use client';

import { useState } from 'react';
import { Search, Filter, UserPlus, MoreVertical, Mail, Phone, MapPin, Calendar, Shield, Edit, Trash2 } from 'lucide-react';
import { ColorAvatar } from '@/components/ui/color-avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample team members data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Sakthi Vishnu",
    email: "sakthi@buildiyo.com",
    role: "Project Manager",
    department: "Management",
    location: "Chennai, India",
    phone: "+91 98765 43210",
    joinDate: "2023-01-15",
    status: "active",
    projects: 12,
  },
  {
    id: 2,
    name: "Vigneshkumar R",
    email: "vigneshkumar@buildiyo.com",
    role: "Lead Architect",
    department: "Architecture",
    location: "Bangalore, India",
    phone: "+91 98765 43211",
    joinDate: "2023-02-20",
    status: "active",
    projects: 8,
  },
  {
    id: 3,
    name: "Ajis A",
    email: "ajis@buildiyo.com",
    role: "Structural Engineer",
    department: "Engineering",
    location: "Mumbai, India",
    phone: "+91 98765 43212",
    joinDate: "2023-03-10",
    status: "active",
    projects: 15,
  },
  {
    id: 4,
    name: "Lakshitha S",
    email: "lakshitha@buildiyo.com",
    role: "MEP Coordinator",
    department: "MEP",
    location: "Delhi, India",
    phone: "+91 98765 43213",
    joinDate: "2023-04-05",
    status: "active",
    projects: 10,
  },
  {
    id: 5,
    name: "Dhana Jagan",
    email: "dhanajagan@buildiyo.com",
    role: "BIM Manager",
    department: "BIM",
    location: "Hyderabad, India",
    phone: "+91 98765 43214",
    joinDate: "2023-05-15",
    status: "active",
    projects: 20,
  },
  {
    id: 6,
    name: "Karthick Sornavel",
    email: "karthick@buildiyo.com",
    role: "Site Supervisor",
    department: "Construction",
    location: "Chennai, India",
    phone: "+91 98765 43215",
    joinDate: "2023-06-01",
    status: "on-site",
    projects: 5,
  },
  {
    id: 7,
    name: "Saravanakumar Kathiravan",
    email: "saravanakumar@buildiyo.com",
    role: "QA/QC Manager",
    department: "Quality",
    location: "Coimbatore, India",
    phone: "+91 98765 43216",
    joinDate: "2023-07-10",
    status: "active",
    projects: 18,
  },
  {
    id: 8,
    name: "Mukesh Kanna",
    email: "mukesh@buildiyo.com",
    role: "Safety Officer",
    department: "Safety",
    location: "Pune, India",
    phone: "+91 98765 43217",
    joinDate: "2023-08-20",
    status: "active",
    projects: 14,
  },
  {
    id: 9,
    name: "Hari AV",
    email: "hari@buildiyo.com",
    role: "Electrical Engineer",
    department: "Electrical",
    location: "Kochi, India",
    phone: "+91 98765 43218",
    joinDate: "2023-09-05",
    status: "active",
    projects: 9,
  },
  {
    id: 10,
    name: "Aathish Mohammad",
    email: "aathish@buildiyo.com",
    role: "Plumbing Engineer",
    department: "Plumbing",
    location: "Trivandrum, India",
    phone: "+91 98765 43219",
    joinDate: "2023-10-12",
    status: "active",
    projects: 7,
  },
  {
    id: 11,
    name: "Shanakkian K",
    email: "shanakkian@buildiyo.com",
    role: "HVAC Specialist",
    department: "HVAC",
    location: "Madurai, India",
    phone: "+91 98765 43220",
    joinDate: "2023-11-01",
    status: "active",
    projects: 11,
  },
  {
    id: 12,
    name: "Sagayaraj Sesuraj",
    email: "sagayaraj@buildiyo.com",
    role: "Interior Designer",
    department: "Interior Design",
    location: "Chennai, India",
    phone: "+91 98765 43221",
    joinDate: "2023-11-15",
    status: "active",
    projects: 6,
  },
  {
    id: 13,
    name: "Jeffrey",
    email: "jeffrey@buildiyo.com",
    role: "Document Controller",
    department: "Administration",
    location: "Chennai, India",
    phone: "+91 98765 43222",
    joinDate: "2023-12-01",
    status: "active",
    projects: 25,
  },
];

const DEPARTMENTS = [
  "All Departments",
  "Management",
  "Architecture",
  "Engineering",
  "MEP",
  "BIM",
  "Construction",
  "Quality",
  "Safety",
  "Electrical",
  "Plumbing",
  "HVAC",
  "Interior Design",
  "Administration",
];

export default function TeamMembers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  
  const filteredMembers = TEAM_MEMBERS.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "All Departments" || 
                              member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'on-site':
        return 'bg-blue-100 text-blue-700';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
            <p className="text-muted-foreground">
              Manage your team members and their roles
            </p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map(dept => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="ml-auto">
            <TabsList>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Team Members Display */}
      {viewMode === "list" ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ColorAvatar
                        name={member.name}
                        email={member.email}
                        size="md"
                      />
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {member.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.projects} projects</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <ColorAvatar
                    name={member.name}
                    email={member.email}
                    size="lg"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-3">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{member.department}</Badge>
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Projects</span>
                    <span className="font-semibold">{member.projects}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}