import React, { useState } from 'react';


export default function BookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Please add a title.';
    }
    if (!author.trim()) {
      newErrors.author = 'Please add an author.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const success = await onAddBook(title.trim(), author.trim());
      if (success) {
        setTitle('');
        setAuthor('');
        setErrors({});
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    if (errors.author) {
      setErrors((prev) => ({ ...prev, author: '' }));
    }
  };

  const inputClass = (hasError) =>
    `w-full px-3 py-2 border rounded bg-white text-base disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
      hasError ? 'border-red-600' : 'border-gray-300'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] items-start">
        <div>
          <label htmlFor="book-title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="book-title"
            name="title"
            type="text"
            placeholder="Book title"
            value={title}
            onChange={handleTitleChange}
            disabled={isSubmitting}
            className={inputClass(errors.title)}
          />
          {errors.title && <p className="text-red-700 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="book-author" className="block text-sm font-medium mb-1">
            Author
          </label>
          <input
            id="book-author"
            name="author"
            type="text"
            placeholder="Who wrote it"
            value={author}
            onChange={handleAuthorChange}
            disabled={isSubmitting}
            className={inputClass(errors.author)}
          />
          {errors.author && <p className="text-red-700 text-sm mt-1">{errors.author}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="md:mt-6 w-full md:w-auto px-5 py-2 rounded bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium cursor-pointer disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {isSubmitting ? 'Adding…' : 'Add'}
        </button>
      </div>
    </form>
  );
}
