import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import * as tokenHolderActions from '../../actions/TokenHolderActions';
import TxQueue from '../TxQueue';
import keys from '../../i18n';
import { numberWithSpaces } from '../../utils/Parameterizer';

class ParameterizerChallenge extends Component {
  constructor (props) {
    super(props);

    this.calculateRemainingTime = this.calculateRemainingTime.bind(this);
    this.toggleChallenge = this.toggleChallenge.bind(this);

    this.state = {
      remainingTime: null,
      isChallenging: false
    };
  }

  componentDidMount () {
    this.setState({
      intervalObj: setInterval(() => this.calculateRemainingTime(), 1000)
    });
  }

  componentWillUnmount () {
    this.props.tokenHolderActions.hideTxQueue();
    clearInterval(this.state.intervalObj);
  }

  calculateRemainingTime () {
    let diff = moment.duration(this.props.activeProposal.timestamp - moment().valueOf());
    this.setState({
      remainingTime: diff > 0 ? diff.humanize() : 'passed'
    });
  }

  toggleChallenge () {
    this.setState({
      isChallenging: !this.state.isChallenging
    });
  }

  resolveChallenge () {
    this.props.tokenHolderActions.hideTxQueue();
    this.props.tokenHolderActions.requestParameterizerInformation();
  }

  render () {
    const { showTxQueue, txQueue, tokenHolderActions, pMinDeposit, activeProposal, transactionParameter } = this.props;
    const { remainingTime } = this.state;
    const isMyTransaction = activeProposal.contractName === transactionParameter;

    return (
      <div className='parameterizerAction'>
        {showTxQueue && isMyTransaction ? (
          <TxQueue
            mode='vertical'
            queue={txQueue}
            cancel={tokenHolderActions.hideParameterizerTxQueue}
            title='Make an application to registry'
            onEnd={() => this.resolveChallenge()}
          />
        ) : (
          <div>
            <h4 className='actionTitle'>{keys.challenge}</h4>
            <div className='actionData'>
              <div className='challengeTime'>
                <p>{keys.remainingTimeText}</p>
                { remainingTime
                  ? <p>{remainingTime}</p>
                  : <LinearProgress
                    mode='indeterminate'
                    style={{
                      width: '100px',
                      marginTop: '7px'
                    }}
                  />}
              </div>
            </div>
            <p className='challengeDeposit'>{`${keys.minDepositRequired}: ${numberWithSpaces(pMinDeposit)}`}</p>
            <RaisedButton
              label={keys.challenge}
              backgroundColor={keys.successColor}
              labelColor={keys.buttonLabelColor}
              onClick={() => tokenHolderActions.challengeProposal(activeProposal)}
            />
          </div>
        )}
      </div>
    );
  }
}

ParameterizerChallenge.propTypes = {
  activeProposal: PropTypes.object.isRequired,
  showTxQueue: PropTypes.bool.isRequired,
  txQueue: PropTypes.object,
  transactionParameter: PropTypes.string,
  tokenHolderActions: PropTypes.object.isRequired,
  pMinDeposit: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const mapStateToProps = state => ({
  showTxQueue: state.parameterizer.showTxQueue,
  txQueue: state.parameterizer.queue,
  transactionParameter: state.parameterizer.transactionParameter,
  pMinDeposit: state.parameterizer.pMinDeposit
});

const mapDispatchToProps = dispatch => ({
  tokenHolderActions: bindActionCreators(tokenHolderActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ParameterizerChallenge);
