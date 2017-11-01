import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import _ from 'lodash';

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const Notification = props => (
  <Message>
    {_.map(props.notifications, (notification, receivedAt) => (
      <div key={receivedAt}>{receivedAt}: {notification}</div>
    ))}
  </Message>
);

export default connect(mapStateToProps)(Notification);
