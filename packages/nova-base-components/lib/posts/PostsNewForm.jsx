import Telescope, { Components, registerComponent } from 'meteor/nova:lib';
import NovaForm from "meteor/nova:forms";
import { ShowIf } from 'meteor/nova:core';
import Posts from "meteor/nova:posts";
import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const PostsNewForm = (props, context) => {
  return (
    <ShowIf
      check={Posts.options.mutations.new.check}
      failureComponent={<FormattedMessage id="users.cannot_post"/>}
    >
      <div className="posts-new-form">
        <NovaForm
          collection={Posts}
          queryToUpdate="postsListQuery"
          extraFragment={`
            htmlBody
            postedAt
            user{
              _id
              __displayName
              __emailHash
              __slug
            }
          `}
          successCallback={post => {
            props.router.push({pathname: Posts.getPageUrl(post)});
            context.closeCallback();
            props.flash(context.intl.formatMessage({id: "posts.created_message"}), "success");
          }}
        />
      </div>
    </ShowIf>
  );
};

PostsNewForm.propTypes = {
  router: React.PropTypes.object,
  flash: React.PropTypes.func,
}

PostsNewForm.contextTypes = {
  closeCallback: React.PropTypes.func,
  intl: intlShape
};

PostsNewForm.displayName = "PostsNewForm";

const mapStateToProps = state => ({ messages: state.messages });
const mapDispatchToProps = dispatch => bindActionCreators(Telescope.actions.messages, dispatch);

registerComponent('PostsNewForm', PostsNewForm, withRouter, connect(mapStateToProps, mapDispatchToProps));