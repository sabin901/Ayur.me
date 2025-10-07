import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

// Skip to main content link
export function SkipToMainContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sage text-white px-4 py-2 rounded-md z-50"
    >
      Skip to main content
    </a>
  );
}

// Focus trap for modals
export function useFocusTrap(enabled: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  return ref;
}

// Screen reader only text
export function SrOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

// Accessible alert component
interface AccessibleAlertProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  onClose?: () => void;
}

export function AccessibleAlert({ type, title, message, onClose }: AccessibleAlertProps) {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertTriangle,
  };

  const colors = {
    info: 'border-blue-200 bg-blue-50 text-blue-800',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    success: 'border-green-200 bg-green-50 text-green-800',
    error: 'border-red-200 bg-red-50 text-red-800',
  };

  const Icon = icons[type];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`border rounded-lg p-4 ${colors[type]}`}
    >
      <div className="flex items-start">
        <Icon className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm">{message}</p>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close alert"
            className="ml-2"
          >
            ×
          </Button>
        )}
      </div>
    </div>
  );
}

// Accessible loading spinner
interface AccessibleLoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AccessibleLoading({ text = 'Loading...', size = 'md' }: AccessibleLoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center p-8"
    >
      <div
        className={`animate-spin rounded-full border-2 border-sage border-t-transparent ${sizeClasses[size]}`}
        aria-hidden="true"
      />
      <span className="sr-only">{text}</span>
      {text && (
        <p className="mt-4 text-sm text-muted-foreground text-center">
          {text}
        </p>
      )}
    </div>
  );
}

// Accessible card with proper heading structure
interface AccessibleCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function AccessibleCard({ title, description, children, level = 3 }: AccessibleCardProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Card>
      <CardContent className="p-6">
        <HeadingTag className="text-lg font-semibold mb-2">{title}</HeadingTag>
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

// Keyboard navigation hook
export function useKeyboardNavigation() {
  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  return { handleKeyDown };
} 