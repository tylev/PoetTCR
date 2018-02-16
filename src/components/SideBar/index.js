import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { NavLink, withRouter } from 'react-router-dom';
import { indigoA200 } from 'material-ui/styles/colors';
import AssessmentIcon from 'material-ui/svg-icons/action/assessment';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import WebIcon from 'material-ui/svg-icons/av/web';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import TuneIcon from 'material-ui/svg-icons/image/tune';
import './style.css';
import keys from '../../i18n';
import {
  CONSUMER,
  APPLICANT,
  MANAGE_TOKENS,
  TOKEN_HOLDER,
  PARAMETERIZER,
} from '../../constants/Navigation';

const iconStyles = {
  color: 'inherit', fill: 'currentColor', transition: 'none'
};

const renderNavItem = (key, to, icon) => (
  <NavLink
    key={key}
    to={to}
    activeStyle={{ color: indigoA200 }}
    style={{ color: keys.textColor }}
  >
    <ListItem
      primaryText={key}
      style={{ color: 'inherit' }}
      leftIcon={icon}
    />
  </NavLink>
);

const SideBar = () => {
  const navItems = [
    {
      key: keys.menu_tokenHolder,
      icon: <AssessmentIcon style={iconStyles} />,
      to: TOKEN_HOLDER
    },
    {
      key: keys.menu_candidate,
      icon: <AssignmentIcon style={iconStyles} />,
      to: APPLICANT
    },
    {
      key: keys.menu_consumer,
      icon: <WebIcon style={iconStyles} />,
      to: CONSUMER
    },
    {
      key: keys.menu_manageTokens,
      icon: <FolderIcon style={iconStyles} />,
      to: MANAGE_TOKENS
    },
    {
      key: keys.menu_parameterizer,
      icon: <TuneIcon style={iconStyles} />,
      to: PARAMETERIZER
    }
  ];
  return (
    <div className='SideBarContainer'>
      <div>
        <List>
          { navItems.map(x => renderNavItem(x.key, x.to, x.icon)) }
          <ListItem
            primaryText={keys.documentationText}
            initiallyOpen={false}
            primaryTogglesNestedList
            nestedItems={[
              <ListItem
                key={1}
                style={{color: keys.textColor}}
                primaryText={keys.documentationItemText}
                leftIcon={<AssessmentIcon style={iconStyles} />}
              />
            ]}
          />
        </List>
      </div>
    </div>
  );
};

export default withRouter(SideBar);
