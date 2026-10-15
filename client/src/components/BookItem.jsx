import React, { useState } from 'react';

export default function BookItem({ book, onMarkAsRead, onDeleteBook }) {
  const [isMarking, setIsMarking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isRead = book.status === 'read';

  const handleMarkRead = async () => {
    if (isRead || isMarking) return;
    try {
      setIsMarking(true);
      await onMarkAsRead(book.id);
    } finally {
      setIsMarking(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      await onDeleteBook(book.id);
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date cleanly
  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <li className="px-5 py-3 grid grid-cols-[auto_1fr] items-start sm:flex sm:items-center gap-x-4 gap-y-2">
      {/* Status mark */}
      <span
        aria-hidden="true"
        className={`w-5 h-5 mt-0.5 sm:mt-0 shrink-0 rounded-full border-2 flex items-center justify-center ${
          isRead ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-400'
        }`}
      >
        {isRead && (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>

      {/* Book Details */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-medium break-words ${isRead ? 'text-gray-500' : 'text-gray-900'}`}
          title={book.title}
        >
          {book.title}
        </h3>
        <p className="text-sm text-gray-500">
          {book.author}
          {formattedDate && <span className="hidden sm:inline"> – added {formattedDate}</span>}
          <span className="sr-only">{isRead ? ' (read)' : ' (unread)'}</span>
        </p>
      </div>

      {/* Actions */}
      <div className="col-start-2 flex items-center gap-4 sm:gap-3 shrink-0 text-sm">
        {/* Mark as Read Button */}
        {!isRead ? (
          <button
            type="button"
            onClick={handleMarkRead}
            disabled={isMarking || isDeleting}
            className="underline underline-offset-2 hover:text-gray-900 text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 rounded-sm"
            aria-label={`Mark "${book.title}" as read`}
          >
            {isMarking ? 'Saving…' : 'Mark as read'}
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="hidden sm:inline text-gray-400 cursor-not-allowed"
            aria-label="Already read"
          >
            Read
          </button>
        )}

        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting || isMarking}
          className="text-gray-500 hover:text-red-700 hover:underline underline-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-sm"
          aria-label={`Delete "${book.title}"`}
        >
          {isDeleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </li>
  );
}
