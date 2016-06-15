import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/std:accounts-ui';
import { Modal, Dropdown, MenuItem } from 'react-bootstrap';
import { ContextPasser } from "meteor/nova:core";
import { LinkContainer } from 'react-router-bootstrap';

class UsersMenu extends Component {

  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {modalOpen: false};
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  renderSettingsModal() {
    
    const SettingsEditForm = Telescope.components.SettingsEditForm;

    return (
      <Modal show={this.state.modalOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="settings.edit"/></Modal.Title>
        </Modal.Header>        
        <Modal.Body>
          <ContextPasser currentUser={this.props.user} messages={this.context.messages} closeCallback={this.closeModal}>
            <SettingsEditForm/>
          </ContextPasser>
        </Modal.Body>
      </Modal>
    )
  }

  render() {

    const user = this.props.user;

    return (
      <div className="users-menu">
        <Dropdown id="user-dropdown">
          <Dropdown.Toggle>
            <Telescope.components.UsersAvatar size="small" user={user} link={false} />
            <div>{Users.getDisplayName(user)}</div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <LinkContainer to={`/users/${user.telescope.slug}`} /*to={{name: "users.single", params: {slug: user.telescope.slug}}}*/>
              <MenuItem className="dropdown-item" eventKey="1"><FormattedMessage id="users.profile"/></MenuItem>
            </LinkContainer>
            <LinkContainer to={`/account`} /*to={{name: "account"}}*/>
              <MenuItem className="dropdown-item" eventKey="2"><FormattedMessage id="users.edit_account"/></MenuItem>
            </LinkContainer>
            {Users.is.admin(user) ? <MenuItem className="dropdown-item" eventKey="3" onClick={this.openModal}><FormattedMessage id="settings"/></MenuItem> : null}
            <MenuItem className="dropdown-item" eventKey="4" onClick={() => Meteor.logout(Accounts.ui._options.onSignedOutHook())}><FormattedMessage id="users.log_out"/></MenuItem>
          </Dropdown.Menu>
        </Dropdown>
        {this.renderSettingsModal()}
      </div>
    ) 
  }

}

UsersMenu.propTypes = {
  user: React.PropTypes.object
}

UsersMenu.contextTypes = {
  messages: React.PropTypes.object
}

module.exports = UsersMenu;
export default UsersMenu;