import React, { useState } from 'react';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  resolved?: boolean;
}

interface AISectionEditorProps {
  sectionTitle: string;
  content: string;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onRegenerateAI: () => void;
  comments?: Comment[];
  isGenerating?: boolean;
  lastSaved?: string;
}

export const AISectionEditor: React.FC<AISectionEditorProps> = ({
  sectionTitle,
  content,
  onContentChange,
  onSave,
  onRegenerateAI,
  comments = [],
  isGenerating = false,
  lastSaved,
}) => {
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would call an API
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-bg">
      {/* Header with Sticky Actions */}
      <div className="bg-white border-b border-slate-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{sectionTitle}</h2>
            {lastSaved && (
              <p className="text-sm text-gray-500 mt-1">
                Last saved: {lastSaved}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onRegenerateAI}
              disabled={isGenerating}
              size="sm"
            >
              {isGenerating ? 'Generating...' : 'Regenerate with AI'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowComments(!showComments)}
              size="sm"
            >
              {showComments ? 'Hide' : 'Show'} Comments ({comments.length})
            </Button>
            <Button onClick={onSave} size="sm">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Two-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Editor */}
        <div className={`flex-1 p-6 overflow-y-auto ${showComments ? 'border-r border-slate-border' : ''}`}>
          <div className="max-w-4xl">
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="w-full h-full min-h-[600px] p-4 border border-slate-border rounded-lg focus:ring-2 focus:ring-consultant-blue focus:border-transparent resize-none font-mono text-sm leading-relaxed"
              placeholder="Your grant application content will appear here. You can edit it directly or use AI to regenerate sections."
              disabled={isGenerating}
            />
            
            {isGenerating && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="flex items-center gap-2 text-consultant-blue">
                  <div className="w-4 h-4 border-2 border-consultant-blue border-t-transparent rounded-full animate-spin"></div>
                  <span>AI is generating content...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comments Sidebar */}
        {showComments && (
          <div className="w-80 bg-white p-4 overflow-y-auto">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Comments & Feedback</h3>
              
              {/* Add New Comment */}
              <Card>
                <CardContent className="p-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment or feedback..."
                    className="w-full p-2 text-sm border border-slate-border rounded focus:ring-1 focus:ring-consultant-blue focus:border-transparent resize-none"
                    rows={3}
                  />
                  <Button
                    onClick={handleAddComment}
                    size="sm"
                    className="mt-2 w-full"
                    disabled={!newComment.trim()}
                  >
                    Add Comment
                  </Button>
                </CardContent>
              </Card>

              {/* Comments List */}
              <div className="space-y-3">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.965 8.965 0 01-4.57-1.229L3 21l2.229-5.43A8.965 8.965 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                    </svg>
                    <p className="text-sm">No comments yet</p>
                    <p className="text-xs">Add feedback or notes about this section</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <Card key={comment.id} className={comment.resolved ? 'bg-gray-50' : ''}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium text-gray-900">
                            {comment.author}
                          </CardTitle>
                          {comment.resolved && (
                            <span className="px-2 py-1 text-xs bg-success-green/10 text-success-green rounded-full">
                              Resolved
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{comment.timestamp}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 