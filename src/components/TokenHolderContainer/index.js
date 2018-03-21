import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader} from 'material-ui/Card';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ListingsList from '../ListingsList';
import ListingsToClaimReward from './ListingsToClaimReward';
import keys from '../../i18n';
import * as consumerActions from '../../actions/ConsumerActions';
import * as tokenHolderActions from '../../actions/TokenHolderActions';
import * as appActions from '../../actions/AppActions';
import UrlUtils from '../../utils/UrlUtils';

class TokenHolderContainer extends Component {
  constructor (props) {
    super(props);

    this.listConfig = {
      columns: [
        {propName: 'label', title: keys.formatString(keys.tokenHolderPage_listingName, {candidate: keys.candidate}), tooltip: keys.tokenHolderPage_listingTooltip},
        {propName: 'status', title: keys.tokenHolderPage_listingStatus, tooltip: keys.tokenHolderPage_listingStatusTooltip},
        {propName: 'dueDate', title: keys.tokenHolderPage_listingDate, tooltip: keys.tokenHolderPage_listingDateTooltip},
        {propName: 'action', title: keys.tokenHolderPage_listingActions, tooltip: keys.tokenHolderPage_listingActionsTooltip}
      ]
    };
    this.rewardsListingConfig = {
      columns: [
        {propName: 'label', title: keys.formatString(keys.tokenHolderPage_listingName, {candidate: keys.candidate}), tooltip: keys.tokenHolderPage_listingTooltip},
        {propName: 'challengeId', title: keys.challengeIdText},
        {propName: 'numTokens', title: keys.challengeVoterStake},
        {propName: 'expectedReward', title: keys.challengeExpectedReward},
        {propName: 'action', title: keys.claimRewardButtonText}
      ]
    };
  }

  componentWillMount () {
    const registry = UrlUtils.getRegistryAddressByLink();
    if (registry && registry !== this.props.registry) {
      this.props.appActions.changeRegistry(registry);
      return;
    }
    this.props.consumerActions.getConsumerListings();
    this.props.tokenHolderActions.requestListingsToClaimReward();
  }

  render () {
    const { listings } = this.props.consumer;
    const { listingsToClaimReward } = this.props.tokenHolder;
    const showRewardsBlock = listingsToClaimReward && listingsToClaimReward.length;

    return (
      <div className='ContentContainer'>
        <h4 className='pageHeadline'>{keys.tokenHolderPage_title}</h4>
        <div>
          {showRewardsBlock
            ? <Card style={{marginBottom: 30}}>
              <CardHeader
                title={keys.listingsToClaimReward}
              />
              <ListingsToClaimReward config={this.rewardsListingConfig} />
            </Card>
            : ''
          }
          <Card>
            <CardHeader
              title={keys.listings}
            />
            <ListingsList
              listings={listings}
              registry={this.props.registry}
              config={this.listConfig}
            />
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    consumer: state.consumer,
    registry: state.app.registry,
    tokenHolder: state.tokenHolder
  };
}

function mapDispatchToProps (dispatch) {
  return {
    consumerActions: bindActionCreators(consumerActions, dispatch),
    tokenHolderActions: bindActionCreators(tokenHolderActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
}

TokenHolderContainer.propTypes = {
  consumer: PropTypes.object.isRequired,
  registry: PropTypes.string.isRequired,
  tokenHolder: PropTypes.object.isRequired,
  consumerActions: PropTypes.object.isRequired,
  tokenHolderActions: PropTypes.object.isRequired,
  appActions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenHolderContainer);
