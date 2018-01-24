import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

class ListingsList extends Component {
  renderHeader (config, adjustForCheckbox, selectable) {
    return (
      <TableHeader adjustForCheckbox={adjustForCheckbox} displaySelectAll={selectable}>
        <TableRow>
          {config.columns.map((column, index) => (
            <TableHeaderColumn key={index} tooltip={column.tooltip}>{column.title}</TableHeaderColumn>
          ))}
        </TableRow>
      </TableHeader>
    );
  }

  renderRow (config, data, index, action) {
    return (
      <TableRow key={index}>
        {config.columns.map((column) => {
          const key = `${index}_${column.propName}`
          if (column.propName !== 'action') {
            return (<TableRowColumn key={key}>{data[column.propName]}</TableRowColumn>);
          }
          // TODO: view valid action state
          return (<TableRowColumn key={key}><RaisedButton label='VIEW' onClick={() => action()} /></TableRowColumn>);
        })}
      </TableRow>
    );
  }

  render () {
    const {listings, config, onListingAction} = this.props;
    const headersFixed = true;
    const selectable = false;
    const adjustForCheckbox = false;
    const displayRowCheckbox = false;
    const deselectOnClickaway = true;
    const showRowHover = false;
    const stripedRows = false;
    return (
      <div>
        <Table
          fixedHeader={headersFixed}
          fixedFooter={headersFixed}
          selectable={selectable}
        >
          {this.renderHeader(config, adjustForCheckbox, selectable)}
          <TableBody
            displayRowCheckbox={displayRowCheckbox}
            deselectOnClickaway={deselectOnClickaway}
            showRowHover={showRowHover}
            stripedRows={stripedRows}
          >
            {listings.map((row, index) => this.renderRow(config, row, index, onListingAction))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

ListingsList.propTypes = {
  listings: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  onListingAction: PropTypes.func.isRequired
};

export default ListingsList;
