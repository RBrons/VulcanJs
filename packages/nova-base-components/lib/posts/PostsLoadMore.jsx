import Telescope from 'meteor/nova:lib';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const PostsLoadMore = ({loadMore, count, totalCount}) => {
  return (
    <a className="posts-load-more" onClick={loadMore}>
      <span><FormattedMessage id="posts.load_more"/></span>
      &nbsp;
      {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
    </a>
  )
}

PostsLoadMore.displayName = "PostsLoadMore";

Telescope.registerComponent('PostsLoadMore', PostsLoadMore);
