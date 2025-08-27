import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ColorAvatarProps {
  name: string;
  email?: string;
  image?: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

// Generate consistent color from string (email or name)
const stringToColor = (str: string): string => {
  // Professional color palette matching the reference image
  const colors = [
    '#8B4513', // Brown
    '#DC143C', // Crimson Red
    '#9370DB', // Medium Purple
    '#4169E1', // Royal Blue
    '#6A5ACD', // Slate Blue
    '#20B2AA', // Light Sea Green
    '#FF6347', // Tomato
    '#4682B4', // Steel Blue
    '#32CD32', // Lime Green
    '#FF69B4', // Hot Pink
    '#8A2BE2', // Blue Violet
    '#00CED1', // Dark Turquoise
    '#D2691E', // Chocolate
    '#CD5C5C', // Indian Red
    '#708090', // Slate Gray
    '#2F4F4F', // Dark Slate Gray
    '#008B8B', // Dark Cyan
    '#B22222', // Fire Brick
    '#228B22', // Forest Green
    '#483D8B', // Dark Slate Blue
  ];

  // Generate hash from string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Select color from palette
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Get initials from name
const getInitials = (name: string): string => {
  if (!name) return 'UN';
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    // Single word - take first two letters
    return parts[0].substring(0, 2).toUpperCase();
  }
  // Multiple words - take first letter of first and last
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const sizeClasses = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
  xl: "h-14 w-14 text-xl",
};

export function ColorAvatar({ 
  name, 
  email, 
  image, 
  className,
  size = "md" 
}: ColorAvatarProps) {
  // Use email for color generation if available, otherwise use name
  const colorSeed = email || name;
  const backgroundColor = stringToColor(colorSeed);
  const initials = getInitials(name);
  
  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {image && <AvatarImage src={image} alt={name} />}
      <AvatarFallback 
        style={{ 
          backgroundColor,
          color: 'white',
          fontWeight: 500,
          fontSize: size === 'xs' ? '0.65rem' : 
                   size === 'sm' ? '0.75rem' :
                   size === 'md' ? '0.875rem' :
                   size === 'lg' ? '1rem' :
                   '1.125rem'
        }}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

interface ColorAvatarGroupProps {
  users: Array<{
    name: string;
    email?: string;
    image?: string;
  }>;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ColorAvatarGroup({ 
  users, 
  max = 3, 
  size = "sm",
  className 
}: ColorAvatarGroupProps) {
  const displayUsers = users.slice(0, max);
  const remainingCount = Math.max(0, users.length - max);
  
  return (
    <div className={cn("flex -space-x-2", className)}>
      {displayUsers.map((user, index) => (
        <div
          key={`${user.email || user.name}-${index}`}
          className="relative ring-2 ring-white rounded-full"
          style={{ zIndex: displayUsers.length - index }}
        >
          <ColorAvatar
            name={user.name}
            email={user.email}
            image={user.image}
            size={size}
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "relative ring-2 ring-white rounded-full flex items-center justify-center bg-gray-100 text-gray-600 font-medium",
            sizeClasses[size]
          )}
          style={{ zIndex: 0 }}
        >
          <span className="text-xs">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
}

export default ColorAvatar;