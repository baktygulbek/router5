import { useCallback, useEffect, useState } from "react";
import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    sendRequest,
    status,
    error,
    data: loadedComment,
  } = useHttp(getAllComments);
  const param = useParams();
  const {quoteId} = param
  console.log(quoteId, 'test');

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommendHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comment;
  if (status === "pending") {
    comment = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    comment = <p className="centered focused">{error}</p>;
  }
  if (status === "completed" && loadedComment && loadedComment.length > 0) {
    comment = <CommentsList comments={loadedComment} />;
  }
  if (status === "completed" && !loadedComment && loadedComment.length === 0) {
    comment = <p>Comment not found</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quotedId={quoteId} onAddedComment={addedCommendHandler} />
      )}
      {comment}
    </section>
  );
};

export default Comments;
