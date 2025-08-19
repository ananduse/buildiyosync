import { useState } from 'react';

// Add random color CSS variable
const randomColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#FF6F61', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'
];

const getRandomColor = () => randomColors[Math.floor(Math.random() * randomColors.length)];

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, User, ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toAbsoluteUrl } from '@/lib/helpers';

interface Task {
  id: number;
  text: string;
  due: string;
  org: string;
  assignees: { name: string; avatar?: string }[];
}

type TaskItem = {
  id: number;
  checked: boolean;
  user: string;
  action: string;
  assignees: { name: string; avatar?: string }[];
  date: string;
};

// Helper to format date as 'Month Day, Year'
function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Reference date for simulation
const referenceDate = new Date('2025-06-09T00:00:00');

const today = new Date(referenceDate);
const yesterday = new Date(referenceDate); yesterday.setDate(today.getDate() - 1);
const tomorrow = new Date(referenceDate); tomorrow.setDate(today.getDate() + 1);
const lastWeek = new Date(referenceDate); lastWeek.setDate(today.getDate() - 7);
const lastWeek2 = new Date(referenceDate); lastWeek2.setDate(today.getDate() - 8);
const nextWeek = new Date(referenceDate); nextWeek.setDate(today.getDate() + 7);

const todayTasks: Task[] = [
  {
    id: 201,
    text: 'Review Q2 roadmap',
    due: formatDate(today),
    org: 'Smart Solutions',
    assignees: [{ name: 'Sarah Smith', avatar: '/media/avatars/300-2.png' }],
  },
  {
    id: 202,
    text: 'Prepare finance report',
    due: formatDate(yesterday),
    org: 'KeenThemes',
    assignees: [{ name: 'Cody Fisher', avatar: '/media/avatars/300-9.png' }, { name: 'Robert Anderson', avatar: '/media/avatars/300-8.png' }],
  },
];

const yesterdayTasks: Task[] = [
  {
    id: 201,
    text: 'Review Q2 roadmap',
    due: formatDate(today), // today (not past due)
    org: 'Smart Solutions',
    assignees: [
      { name: 'Sarah Smith' },
    ],
  },
  {
    id: 202,
    text: 'Prepare finance report',
    due: formatDate(yesterday), // yesterday (past due)
    org: 'KeenThemes',
    assignees: [
      { name: 'Cody Fisher' },
      { name: 'Robert Anderson' },
    ],
  },
];

const lastWeekTasks: Task[] = [
  {
    id: 301,
    text: 'Review Q2 performance metrics',
    due: formatDate(lastWeek), // last week (past due)
    org: 'Tech Innovators',
    assignees: [{ name: 'David Anderson', avatar: '/media/avatars/300-6.png' }, { name: 'Arlene McCoy', avatar: '/media/avatars/300-15.png' }],
  },
  {
    id: 302,
    text: 'Test new onboarding flow',
    due: formatDate(nextWeek), // next week (not past due)
    org: 'Digital Solutions',
    assignees: [{ name: 'Lisa Wilson', avatar: '/media/avatars/300-5.png' }],
  },
  {
    id: 303,
    text: 'Follow up with sales',
    due: formatDate(lastWeek2), // last week (past due)
    org: 'Market Growth',
    assignees: [{ name: 'Robert Anderson', avatar: '/media/avatars/300-8.png' }],
  },
];

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon } from 'lucide-react';

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function Assignees({ assignees }: { assignees: { name: string }[] }) {
  const uniqueAvatars = [
    { name: 'Cody Fisher', avatar: '/media/avatars/300-9.png', gender: 'male' },
    { name: 'Sarah Smith', avatar: '/media/avatars/300-2.png', gender: 'female' },
    { name: 'Arlene McCoy', avatar: '/media/avatars/300-15.png', gender: 'female' },
    { name: 'Mike Brown', avatar: '/media/avatars/300-4.png', gender: 'male' },
    { name: 'Lisa Wilson', avatar: '/media/avatars/300-5.png', gender: 'female' },
    { name: 'David Anderson', avatar: '/media/avatars/300-6.png', gender: 'male' },
    { name: 'Mike Johnson', avatar: '/media/avatars/300-7.png', gender: 'male' },
    { name: 'Robert Anderson', avatar: '/media/avatars/300-8.png', gender: 'male' },
  ];

  const getUniqueAvatar = (name: string) => {
    const avatar = uniqueAvatars.find(a => a.name === name);
    return avatar || uniqueAvatars[0];
  };

  if (assignees.length === 1) {
    const avatarData = getUniqueAvatar(assignees[0].name);
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <Avatar className="size-4">
                <AvatarImage src={toAbsoluteUrl(avatarData.avatar)} alt={avatarData.name} />
                <AvatarFallback>{getInitials(avatarData.name)}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">{avatarData.name.split(' ')[0]}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-2 flex gap-3.5">
            <div className="flex items-center gap-2">
              <Avatar className="size-4">
                <AvatarImage src={toAbsoluteUrl(avatarData.avatar)} alt={avatarData.name} />
                <AvatarFallback>{getInitials(avatarData.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{avatarData.name}</div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 cursor-pointer">
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gray-400">{assignees.length}</span>
            <span className="ml-1 text-xs font-medium">Assignees</span>
          </span>
        </TooltipTrigger>
        <TooltipContent className="p-2 flex gap-3.5">
          {assignees.map((a) => (
            <div key={a.name} className="flex items-center gap-2">
              <Avatar className="size-4">
                <AvatarImage src={toAbsoluteUrl(getUniqueAvatar(a.name).avatar)} alt={a.name} />
                <AvatarFallback>{getInitials(a.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{a.name}</div>
              </div>
            </div>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function isPastDue(due: string) {
  // Assume due is in format like 'June 10, 2025'
  const dueDate = new Date(due);
  const now = new Date('2025-06-09T00:00:00'); // Use provided current date
  return dueDate < now;
}

export function CompanyRecordsTasks() {
  // Only Today expanded by default
  const [expanded, setExpanded] = useState({ today: true, yesterday: false, lastWeek: false });
  // State for each group
  const [today, setToday] = useState<Task[]>(todayTasks);
  const [yesterday, setYesterday] = useState<Task[]>(yesterdayTasks);
  const [lastWeek, setLastWeek] = useState<Task[]>(lastWeekTasks);

  const handleDelete = (group: 'today' | 'yesterday' | 'lastWeek', id: number) => {
    if (group === 'today') setToday(tasks => tasks.filter((t: Task) => t.id !== id));
    if (group === 'yesterday') setYesterday(tasks => tasks.filter((t: Task) => t.id !== id));
    if (group === 'lastWeek') setLastWeek(tasks => tasks.filter((t: Task) => t.id !== id));
  };

  return (
    <div className="grid">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Tasks</h2>
        <Button variant="outline" size="sm" className="gap-1">+ Create task</Button>
      </div>
      {/* Today group */}
      <div>
        <button
          className="w-full flex items-center py-2 cursor-pointer text-xs text-muted-foreground font-medium gap-2"
          onClick={() => setExpanded(prev => ({ ...prev, today: !prev.today }))}
          aria-expanded={expanded.today}
        >
          <span className={`transition-transform ${expanded.today ? '' : '-rotate-90'}`}>
            <ChevronDown className="size-4" />
          </span>
          <span>Today</span>
        </button>

        {expanded.today && (
          <div>
            {[
              {
                id: 1,
                checked: false,
                user: '@Keenthemes',
                action: 'completed project milestone',
                assignees: [
                  { name: 'Ana Smith', avatar: '/media/avatars/300-1.png' },
                  { name: 'John Doe', avatar: '/media/avatars/300-5.png' },
                  { name: 'Emily Johnson', avatar: '/media/avatars/300-3.png' }
                ],
                date: 'May 14, 2025',
                due: 'June 12, 2025'
              },
              {
                id: 2,
                checked: true,
                user: '@Tbg',
                action: 'created new task',
                assignees: [{ name: 'Alex Thompson' }],
                date: 'July 22, 2025',
                due: 'June 18, 2025'
              },
              {
                id: 3,
                checked: false,
                user: '@DesignTeam',
                action: 'Reviewed design mockups',
                assignees: [
                  { name: 'Sarah Wilson', avatar: '/media/avatars/300-4.png' },
                  { name: 'Michael Brown', avatar: '/media/avatars/300-9.png' }
                ],
                date: 'July 27, 2025',
                due: 'June 28, 2025'
              }
            ].map((task: TaskItem, index) => (
              <div 
                key={index} 
                className={`flex items-center ps-6 py-1 gap-1 ${index === 1 ? 'hover:bg-muted/20' : ''}`}
              >
                <Checkbox 
                  size='sm' 
                  className="mt-[1px] me-1" 
                  defaultChecked={task.checked} 
                />
                <Link to="#" className="font-medium hover:text-primary">
                  {task.user || 'Team'}
                </Link>
                <span className="text-muted-foreground">{task.action}</span>
                <div className="ms-auto flex items-center gap-2">
                  {task.assignees.length > 1 ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="secondary"
                            size="sm"
                            className="cursor-pointer"
                          >
                            <Users className="size-3.5" /> {task.assignees.length} People
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 flex gap-3.5">
                          {task.assignees.map((assignee) => (
                            <div key={assignee.name} className="flex items-center gap-1">
                              <Avatar className="size-4">
                                {assignee.avatar && (
                                  <AvatarImage
                                    src={toAbsoluteUrl(assignee.avatar)}
                                    alt={assignee.name}
                                  />
                                )}
                                <AvatarFallback>{getInitials(assignee.name)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{assignee.name}</span>
                            </div>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="secondary" size="sm">
                            <User className="size-3.5" /> {task.assignees[0].name}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 flex gap-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-4">
                              {task.assignees[0].avatar && (
                                <AvatarImage src={toAbsoluteUrl(task.assignees[0].avatar)} alt={task.assignees[0].name} />
                              )}
                              <AvatarFallback>{getInitials(task.assignees[0].name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{task.assignees[0].name}</div>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <Badge 
                    variant={new Date(task.date) > new Date() ? "secondary" : "destructive"} 
                    appearance="light" 
                    size="sm"
                  >
                    <CalendarIcon className={`size-3.5 ${index === 1 ? 'opacity-60' : ''}`} />
                    {task.date}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Yesterday group */}
      <div>
        <button
          className="w-full flex items-center cursor-pointer py-2 text-xs text-muted-foreground font-medium gap-2"
          onClick={() => setExpanded(prev => ({ ...prev, yesterday: !prev.yesterday }))}
          aria-expanded={expanded.yesterday}
        >
          <span className={`transition-transform ${expanded.yesterday ? '' : '-rotate-90'}`}>
            <ChevronDown className="size-4" />
          </span>
          <span>Yesterday</span>
        </button>

        {expanded.yesterday && (
          <div>
            {[
              {
                id: 4,
                checked: false,
                user: '',
                action: 'Updated project documentation',
                assignees: [
                  { name: 'Mike Johnson', avatar: '/media/avatars/300-7.png' },
                  { name: 'Sarah Smith', avatar: '/media/avatars/300-2.png' }
                ],
                date: 'July 5, 2025',
                due: 'June 12, 2025'
              },
              {
                id: 5,
                checked: true,
                user: '',
                action: 'Deployed application update',
                assignees: [{ name: 'Robert Anderson', avatar: '/media/avatars/300-8.png' }],
                date: 'June 30, 2025',
                due: 'June 18, 2025'
              }
            ].map((task: TaskItem, index) => (
              <div 
                key={index} 
                className={`flex items-center ps-6 py-1 gap-0.5 ${index === 1 ? '' : ''}`}
              >
                <Checkbox 
                  size='sm' 
                  className="mt-[1px] me-1" 
                  defaultChecked={task.checked} 
                />
                <Link to="#" className="font-medium hover:text-primary">
                  {task.user || ''}
                </Link>
                <span className="text-muted-foreground">{task.action}</span>
                <div className="ms-auto flex items-center gap-2">
                  {task.assignees.length > 1 ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="secondary"
                            size="sm"
                            className="cursor-pointer"
                          >
                            <Users className="size-3.5" /> {task.assignees.length} People
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 flex gap-3.5">
                          {task.assignees.map((assignee) => (
                            <div key={assignee.name} className="flex items-center gap-1">
                              <Avatar className="size-4">
                                {assignee.avatar && (
                                  <AvatarImage
                                    src={toAbsoluteUrl(assignee.avatar)}
                                    alt={assignee.name}
                                  />
                                )}
                                <AvatarFallback>{getInitials(assignee.name)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{assignee.name}</span>
                            </div>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="secondary" size="sm">
                            <User className="size-3.5" /> {task.assignees[0].name}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 flex gap-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-4">
                              {task.assignees[0].avatar && (
                                <AvatarImage src={toAbsoluteUrl(task.assignees[0].avatar)} alt={task.assignees[0].name} />
                              )}
                              <AvatarFallback>{getInitials(task.assignees[0].name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{task.assignees[0].name}</div>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <Badge 
                    variant={new Date(task.date) > new Date() ? "secondary" : "destructive"} 
                    appearance="light" 
                    size="sm"
                  >
                    <CalendarIcon className={`size-3.5 ${index === 1 ? 'opacity-60' : ''}`} />
                    {task.date}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Last week group */}
      <div>
        <button
          className="w-full flex items-center cursor-pointer py-2 text-xs text-muted-foreground font-medium gap-2"
          onClick={() => setExpanded(prev => ({ ...prev, lastWeek: !prev.lastWeek }))}
          aria-expanded={expanded.lastWeek}
        >
          <span className={`transition-transform ${expanded.lastWeek ? '' : '-rotate-90'}`}>
            <ChevronDown className="size-4" />
          </span>
          <span>Last week</span>
        </button>

        {expanded.lastWeek && (
          <div>
            {[
              {
                id: 6,
                checked: false,
                user: '@Marketing',
                action: 'Launched marketing campaign',
                assignees: [
                  { name: 'Lisa Wilson', avatar: '/media/avatars/300-5.png' },
                  { name: 'David Anderson', avatar: '/media/avatars/300-6.png' }
                ],
                date: 'July 25, 2025',
                due: 'July 22, 2025'
              },
              {
                id: 7,
                checked: true,
                user: '',
                action: 'Completed Sales Deal',
                assignees: [{ name: 'Arlene McCoy', avatar: '/media/avatars/300-15.png' }],
                date: 'June 24, 2025',
                due: 'July 28, 2025'
              }
            ].map((task: TaskItem, index) => (
              <div 
                key={index} 
                className={`flex items-center ps-6 py-1 gap-1 ${index === 1 ? '' : ''}`}
              >
                <Checkbox 
                  size='sm' 
                  className="mt-[1px] me-1" 
                  defaultChecked={task.checked} 
                />
                <Link to="#" className="font-medium hover:text-primary">
                  {task.user || 'Team'}
                </Link>
                <span className="text-muted-foreground">{task.action}</span>
                <div className="ms-auto flex items-center gap-2">
                  {task.assignees.length > 1 ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="secondary"
                            size="sm"
                            className="cursor-pointer"
                          >
                            <Users className="size-3.5" /> {task.assignees.length} People
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 flex gap-3.5">
                          {task.assignees.map((assignee) => (
                            <div key={assignee.name} className="flex items-center gap-1">
                              <Avatar className="size-4">
                                {assignee.avatar && (
                                  <AvatarImage
                                    src={toAbsoluteUrl(assignee.avatar)}
                                    alt={assignee.name}
                                  />
                                )}
                                <AvatarFallback>{getInitials(assignee.name)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{assignee.name}</span>
                            </div>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="secondary" size="sm">
                            <User className="size-3.5" /> {task.assignees[0].name}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 flex gap-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-4">
                              {task.assignees[0].avatar && (
                                <AvatarImage src={toAbsoluteUrl(task.assignees[0].avatar)} alt={task.assignees[0].name} />
                              )}
                              <AvatarFallback>{getInitials(task.assignees[0].name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{task.assignees[0].name}</div>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <Badge 
                    variant={new Date(task.date) > new Date() ? "secondary" : "destructive"} 
                    appearance="light" 
                    size="sm"
                  >
                    <CalendarIcon className={`size-3.5 ${index === 1 ? 'opacity-60' : ''}`} />
                    {task.date}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}