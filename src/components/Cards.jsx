import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, Image, Modal, Button, Header } from 'semantic-ui-react';
import { deleteGituser } from '../actions';

const mapStateToProps = state => ({
  repos: state.repos,
  users: state.gitusers,
  state,
});

const mapDispatchToProps = dispatch => ({
  deleteGituser: gituser => dispatch(deleteGituser(gituser)),
});

const Cards = props => (
  <div>
    {_.map(props.users, (body, username) => {
      if (!body.isRequesting) {
        return (
          <Modal
            key={`${username}` + 'modal'}
            trigger={
              <Card key={`${username}` + 'card'}>
                <Image src={body.info.avatar_url} />
                <Card.Content>
                  <Card.Header>
                    {username}
                  </Card.Header>
                  <Card.Meta>
                    {body.info.company ? body.info.company : 'no company'}
                  </Card.Meta>
                </Card.Content>
              </Card>
            }
          >
            <Modal.Header>{username}</Modal.Header>
            <Modal.Content image>
              <Image src={body.info.avatar_url} />
              <Modal.Description>
                <Header>Repos</Header>
                {_.map(body.repos, repo => (
                  <p key={repo}>{props.repos[repo].name}</p>
                ))}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={() => props.deleteGituser(username)}
              >
                delete
              </Button>
            </Modal.Actions>
          </Modal>
          );
      }
      return <div key={username + 'div'} />;
    })}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
