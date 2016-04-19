import React from 'react';

const PostsThumbnail = ({post}) => {
  return (
    <a className="posts-thumbnail" href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
      <img src={Posts.getThumbnailUrl(post)} />
    </a>
  )
}

module.exports = PostsThumbnail;
export default PostsThumbnail;