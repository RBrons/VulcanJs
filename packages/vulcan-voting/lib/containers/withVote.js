import React, { PropTypes, Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { operateOnItem } from '../modules/vote.js';
import { VoteableCollections } from '../modules/make_voteable.js';

const withVote = component => {

  return graphql(gql`
    mutation vote($documentId: String, $voteType: String, $collectionName: String) {
      vote(documentId: $documentId, voteType: $voteType, collectionName: $collectionName) {
        ${VoteableCollections.map(collection => `
          ... on ${collection.typeName} {
            __typename
            _id
            upvotes
            upvoters {
              _id
            }
            downvotes
            downvoters {
              _id
            }
            baseScore
          }
        `).join('\n')}
      }
    }
  `, {
    props: ({ownProps, mutate}) => ({
      vote: ({document, voteType, collection, currentUser}) => {
        const voteResult = operateOnItem(collection, document, currentUser, voteType, true);
        return mutate({ 
          variables: {
            documentId: document._id, 
            voteType,
            collectionName: collection._name,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            vote: {
              ...voteResult,
            },
          }
        })
      }
    }),
  })(component);
}

export default withVote;