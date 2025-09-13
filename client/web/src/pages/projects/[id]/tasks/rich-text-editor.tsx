import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Quote,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Maximize2,
  FileText,
  Table
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  maxHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start typing...',
  minHeight = '200px',
  maxHeight = '400px'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize editor with value
  React.useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = value || '';
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  // Update content when value changes externally
  React.useEffect(() => {
    if (editorRef.current && isInitialized && editorRef.current.innerHTML !== value) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const cursorPosition = range?.startOffset;
      
      editorRef.current.innerHTML = value || '';
      
      // Restore cursor position
      if (selection && range && cursorPosition !== undefined) {
        try {
          const newRange = document.createRange();
          const textNode = editorRef.current.childNodes[0] || editorRef.current;
          if (textNode) {
            newRange.setStart(textNode, Math.min(cursorPosition, textNode.textContent?.length || 0));
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        } catch (e) {
          // Ignore range errors
        }
      }
    }
  }, [value, isInitialized]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleFormat = (command: string, value?: string) => {
    execCommand(command, value);
    // Update the parent component with the new HTML
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleAddLink = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
      setShowLinkDialog(true);
    } else {
      alert('Please select some text first');
    }
  };

  const insertLink = () => {
    if (linkUrl && selectedText) {
      execCommand('createLink', linkUrl);
      setShowLinkDialog(false);
      setLinkUrl('');
      setSelectedText('');
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const handleAddTable = () => {
    const table = `
      <table style="border-collapse: collapse; width: 100%; margin: 10px 0;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f3f4f6;">Header 1</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f3f4f6;">Header 2</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #f3f4f6;">Header 3</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Cell 1</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Cell 2</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Cell 3</td>
        </tr>
      </table>
    `;
    execCommand('insertHTML', table);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Bold' },
    { icon: Italic, command: 'italic', title: 'Italic' },
    { icon: Underline, command: 'underline', title: 'Underline' },
    { divider: true },
    { icon: Heading2, command: 'formatBlock', value: 'H2', title: 'Heading' },
    { icon: Quote, command: 'formatBlock', value: 'BLOCKQUOTE', title: 'Quote' },
    { icon: Code, command: 'formatBlock', value: 'PRE', title: 'Code Block' },
    { divider: true },
    { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
    { divider: true },
    { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
    { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
    { divider: true },
    { icon: Link, command: 'link', title: 'Insert Link', special: true },
    { icon: Table, command: 'table', title: 'Insert Table', special: true },
    { divider: true },
    { icon: Undo, command: 'undo', title: 'Undo' },
    { icon: Redo, command: 'redo', title: 'Redo' },
    { icon: Maximize2, command: 'fullscreen', title: 'Fullscreen', special: true }
  ];

  return (
    <>
      <style>
        {`
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            pointer-events: none;
            display: block;
          }
        `}
      </style>
    <div style={{
      position: isFullscreen ? 'fixed' : 'relative',
      top: isFullscreen ? 0 : 'auto',
      left: isFullscreen ? 0 : 'auto',
      right: isFullscreen ? 0 : 'auto',
      bottom: isFullscreen ? 0 : 'auto',
      backgroundColor: 'white',
      zIndex: isFullscreen ? 9999 : 1,
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #e5e7eb',
      borderRadius: isFullscreen ? 0 : '8px',
      overflow: 'hidden'
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px',
        padding: '8px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        {toolbarButtons.map((button, index) => {
          if (button.divider) {
            return (
              <div
                key={index}
                style={{
                  width: '1px',
                  height: '24px',
                  backgroundColor: '#e5e7eb',
                  margin: '0 4px'
                }}
              />
            );
          }

          const Icon = button.icon;
          return (
            <button
              key={index}
              title={button.title}
              onClick={() => {
                if (button.command === 'link') {
                  handleAddLink();
                } else if (button.command === 'table') {
                  handleAddTable();
                } else if (button.command === 'fullscreen') {
                  setIsFullscreen(!isFullscreen);
                } else {
                  handleFormat(button.command, button.value);
                }
              }}
              style={{
                padding: '6px',
                backgroundColor: 'transparent',
                border: '1px solid transparent',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon style={{ width: '16px', height: '16px', color: '#4b5563' }} />
            </button>
          );
        })}
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          const selection = window.getSelection();
          const range = selection?.getRangeAt(0);
          const cursorPosition = range?.startOffset;
          
          onChange(e.currentTarget.innerHTML);
          
          // Restore cursor position after React re-render
          setTimeout(() => {
            if (editorRef.current && selection && range && cursorPosition !== undefined) {
              try {
                const newRange = document.createRange();
                const textNode = editorRef.current.childNodes[0] || editorRef.current;
                if (textNode) {
                  newRange.setStart(textNode, Math.min(cursorPosition, textNode.textContent?.length || 0));
                  newRange.collapse(true);
                  selection.removeAllRanges();
                  selection.addRange(newRange);
                }
              } catch (e) {
                // Ignore range errors
              }
            }
          }, 0);
        }}
        style={{
          flex: 1,
          minHeight: isFullscreen ? 'auto' : minHeight,
          maxHeight: isFullscreen ? 'none' : maxHeight,
          padding: '12px',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#111827',
          overflowY: 'auto',
          outline: 'none'
        }}
        data-placeholder={placeholder}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          zIndex: 10000,
          minWidth: '300px'
        }}>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Insert Link</h4>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
              Selected Text
            </label>
            <input
              type="text"
              value={selectedText}
              readOnly
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                fontSize: '13px',
                backgroundColor: '#f9fafb'
              }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
              URL
            </label>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                setShowLinkDialog(false);
                setLinkUrl('');
                setSelectedText('');
              }}
              style={{
                padding: '6px 12px',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={insertLink}
              style={{
                padding: '6px 12px',
                backgroundColor: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Insert
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};