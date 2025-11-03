"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Tapez votre texte...",
  className = ""
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-lg p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive, 
    children, 
    title 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    children: React.ReactNode; 
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        isActive ? 'bg-gray-200 text-black' : 'text-gray-600'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Gras"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italique"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1 my-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Liste à puces"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Liste numérotée"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Citation"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1 my-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Annuler"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Rétablir"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
        <EditorContent 
          editor={editor} 
          placeholder={placeholder}
        />
      </div>

      {value && (
        <div className="border-t border-gray-200 p-2 bg-gray-50">
          <p className="text-xs text-gray-500">
            {editor.storage.characterCount?.characters() || 0} caractères
          </p>
        </div>
      )}
    </div>
  );
}
