// Unified Picker Styles for Consistent Design Across the Project

import React from 'react';

export const pickerStyles = {
  // Main container for the picker dropdown
  container: {
    position: 'fixed' as const,
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '2px',
    minWidth: '220px',
    maxWidth: '320px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    zIndex: 10000,
    opacity: 1
  },

  // Header section with title and search
  header: {
    padding: '6px 6px 8px',
    borderBottom: '1px solid #f3f4f6'
  },

  // Title style
  title: {
    fontSize: '11px',
    color: '#9ca3af',
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
    fontWeight: '600',
    letterSpacing: '0.5px'
  },

  // Search input
  searchInput: {
    width: '100%',
    padding: '6px 10px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '12px',
    outline: 'none',
    backgroundColor: '#f9fafb',
    transition: 'all 0.2s'
  },

  // Scrollable content area
  content: {
    maxHeight: '280px',
    overflowY: 'auto' as const,
    padding: '2px',
    marginTop: '2px'
  },

  // Individual option item
  option: {
    padding: '4px 6px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: '6px',
    marginBottom: '1px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    backgroundColor: 'transparent',
    border: '1px solid transparent'
  },

  // Hover state for options
  optionHover: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb'
  },

  // Selected option state
  optionSelected: {
    backgroundColor: '#f0f1ff',
    borderColor: '#c7d2fe'
  },

  // Label text in option
  optionLabel: {
    flex: 1,
    fontSize: '14px',
    color: '#111827',
    fontWeight: '500'
  },

  // Badge or secondary text
  optionBadge: {
    fontSize: '11px',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '2px 6px',
    borderRadius: '4px'
  },

  // Footer section with actions
  footer: {
    borderTop: '1px solid #e5e7eb',
    marginTop: '8px',
    paddingTop: '8px'
  },

  // Action button in footer
  footerAction: {
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.15s',
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    fontSize: '13px',
    color: '#6b7280'
  },

  // Group header style
  groupHeader: {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '600',
    padding: '8px 12px 4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
  },

  // Empty state
  emptyState: {
    padding: '24px',
    textAlign: 'center' as const,
    color: '#9ca3af',
    fontSize: '13px'
  },

  // Color indicator dot
  colorDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0
  },

  // Avatar style
  avatar: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    fontWeight: '600',
    color: 'white',
    flexShrink: 0
  },

  // Icon container
  iconContainer: {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },

  // Checkmark for selected items
  checkmark: {
    width: '16px',
    height: '16px',
    color: '#10b981'
  },

  // Close button
  closeButton: {
    position: 'absolute' as const,
    top: '8px',
    right: '8px',
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    color: '#9ca3af',
    transition: 'all 0.2s'
  },

  // Divider
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '8px 0'
  },

  // Loading state
  loading: {
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280'
  },

  // Animation keyframes (to be added to global styles)
  animations: `
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `
};

// Helper function to merge styles with custom overrides
export const mergeStyles = (baseStyle: any, customStyle?: any) => {
  return { ...baseStyle, ...customStyle };
};

// Common picker props interface
export interface PickerProps {
  value: any;
  onChange: (value: any) => void;
  onClose: () => void;
  options?: any[];
  loading?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  placeholder?: string;
  customStyles?: any;
}

// Common hook for picker behavior
export const usePickerBehavior = (onClose: () => void) => {
  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when picker is open
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    // Don't lock scroll for now to avoid layout shift
    // document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
};

// Export animation styles to be added once to the document
export const injectPickerAnimations = () => {
  if (!document.getElementById('picker-animations')) {
    const style = document.createElement('style');
    style.id = 'picker-animations';
    style.innerHTML = pickerStyles.animations;
    document.head.appendChild(style);
  }
};

// Call this once when the app loads
if (typeof window !== 'undefined') {
  injectPickerAnimations();
}