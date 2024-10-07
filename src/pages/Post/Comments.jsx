import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Button, Divider, Flex, List } from "antd";
import { COMMENTS_SUBSCRIPTIONS, GET_POST_COMMENTS } from "./queries";
import Comment from "components/Comment";

function Comments({ post_id }) {
  const [btnIsVisible, setBtnIsVisible] = useState(true);
  const [loadComments, { called, loading, error, data, subscribeToMore }] =
    useLazyQuery(GET_POST_COMMENTS, {
      variables: { id: post_id },
    });

  useEffect(() => {
    if (!loading && called) {
      subscribeToMore({
        document: COMMENTS_SUBSCRIPTIONS,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newCommentItem = subscriptionData.data.commentCreated;

          return {
            post: {
              ...prev.post,
              comments: [...prev.post.comments, newCommentItem],
            },
          };
        },
      });
    }
  }, [loading, called, subscribeToMore]);

  useEffect(() => {
    if (!loading && data) {
      setBtnIsVisible(false);
    }
  }, [data, loading]);

  return (
    <div>
      <Divider>Comments</Divider>
      {btnIsVisible && (
        <Flex justify="center">
          <Button loading={loading} onClick={loadComments}>
            Show Comments
          </Button>
        </Flex>
      )}
      {error && <div>Error: {error.message}</div>}
      {!loading && data && (
        <List
          className="comment-list"
          header={
            data.post.comments.length
              ? `${data.post.comments.length} replies`
              : ""
          }
          itemLayout="horizontal"
          dataSource={data.post.comments}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.user.fullName}
                avatar={item.user.profile_photo}
                content={item.text}
              />
            </li>
          )}
        />
      )}
    </div>
  );
}

export default Comments;
