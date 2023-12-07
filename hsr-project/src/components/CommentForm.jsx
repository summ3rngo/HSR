import React, { useState } from 'react';

const CommentForm = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCommentSubmit(comment);
        setComment('');
    };

  return (
    <form className='comment-area' >
      <div className="form-group">
        <label htmlFor="commentArea">Comment</label>
        <textarea className="form-control" id="commentArea" rows="3" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CommentForm;
