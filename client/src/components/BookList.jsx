import React from 'react';
import BookItem from './BookItem';


export default function BookList({ books, isLoading, onMarkAsRead, onDeleteBook }) {
  if (isLoading) {
    return <p className="p-5 text-gray-600">Loading your books…</p>;
  }

  if (!books || books.length === 0) {
    return <p className="p-5 text-gray-600">Nothing here yet. Add your first book above.</p>;
  }

  const readCount = books.filter((b) => b.status === 'read').length;

  return (
    <div>
      <div className="px-5 pt-4 pb-2 flex items-baseline justify-between">
        <h2 className="font-semibold">Reading list</h2>
        <p className="text-sm text-gray-500">
          {readCount} of {books.length} read
        </p>
      </div>

      <ul className="divide-y divide-gray-200 border-t border-gray-200" role="list" aria-label="Book list">
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onMarkAsRead={onMarkAsRead}
            onDeleteBook={onDeleteBook}
          />
        ))}
      </ul>
    </div>
  );
}
