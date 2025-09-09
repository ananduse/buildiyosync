import React from 'react';
import { AlertTriangle, Trash2, X, CheckCircle, Info, AlertCircle } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  icon
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: '#fee2e2',
          iconColor: '#ef4444',
          confirmBg: '#ef4444',
          confirmHover: '#dc2626',
          defaultIcon: <Trash2 style={{ width: '24px', height: '24px' }} />
        };
      case 'warning':
        return {
          iconBg: '#fef3c7',
          iconColor: '#f59e0b',
          confirmBg: '#f59e0b',
          confirmHover: '#d97706',
          defaultIcon: <AlertTriangle style={{ width: '24px', height: '24px' }} />
        };
      case 'success':
        return {
          iconBg: '#dcfce7',
          iconColor: '#22c55e',
          confirmBg: '#22c55e',
          confirmHover: '#16a34a',
          defaultIcon: <CheckCircle style={{ width: '24px', height: '24px' }} />
        };
      case 'info':
      default:
        return {
          iconBg: '#dbeafe',
          iconColor: '#3b82f6',
          confirmBg: '#3b82f6',
          confirmHover: '#2563eb',
          defaultIcon: <Info style={{ width: '24px', height: '24px' }} />
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Dialog */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '420px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: 'slideUp 0.3s ease-out',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            padding: '24px 24px 20px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: styles.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: styles.iconColor,
              flexShrink: 0
            }}>
              {icon || styles.defaultIcon}
            </div>
            <div style={{ marginLeft: '16px', flex: 1 }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                margin: 0,
                lineHeight: '28px'
              }}>
                {title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginTop: '8px',
                lineHeight: '20px',
                margin: '8px 0 0 0'
              }}>
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                marginLeft: '8px',
                color: '#9ca3af',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#6b7280'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            padding: '20px 24px',
            backgroundColor: '#f9fafb',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '10px 16px',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              style={{
                flex: 1,
                padding: '10px 16px',
                backgroundColor: styles.confirmBg,
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: 'white',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.confirmHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.confirmBg}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

// Notification Component
interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 3000,
  onClose
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: '#dcfce7',
          border: '#86efac',
          color: '#14532d',
          icon: <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e' }} />
        };
      case 'error':
        return {
          bg: '#fee2e2',
          border: '#fca5a5',
          color: '#7f1d1d',
          icon: <AlertCircle style={{ width: '20px', height: '20px', color: '#ef4444' }} />
        };
      case 'warning':
        return {
          bg: '#fef3c7',
          border: '#fde047',
          color: '#713f12',
          icon: <AlertTriangle style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
        };
      case 'info':
      default:
        return {
          bg: '#dbeafe',
          border: '#93c5fd',
          color: '#1e3a8a',
          icon: <Info style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
        };
    }
  };

  const styles = getNotificationStyles();

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: styles.bg,
        border: `1px solid ${styles.border}`,
        borderRadius: '12px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px',
        maxWidth: '400px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        zIndex: 10000,
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      {styles.icon}
      <span style={{
        flex: 1,
        fontSize: '14px',
        fontWeight: '500',
        color: styles.color
      }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          color: styles.color,
          opacity: 0.7,
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
      >
        <X style={{ width: '16px', height: '16px' }} />
      </button>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Notification Manager Hook
export const useNotification = () => {
  const [notifications, setNotifications] = React.useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>>([]);

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const NotificationContainer = () => (
    <>
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{
            position: 'fixed',
            top: `${20 + index * 80}px`,
            right: '20px',
            zIndex: 10000 + index
          }}
        >
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        </div>
      ))}
    </>
  );

  return { showNotification, NotificationContainer };
};