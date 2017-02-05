import './App.scss';
import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as KanbanActions from '../actions';
import { ColumnContainer } from '../components/ColumnContainer';
import { getColumns } from '../reducers/columns';

@DragDropContext(HTML5Backend)
class App extends Component {
    handleKeyPress = event => {
        if (event.key === 'Enter' && event.target.value.trim()) {
            this.props.actions.addColumn(event.target.value);
            event.target.value = '';
        }
    };

    render() {
        const {columns, actions} = this.props;
        return (
            <div className='app'>
                {columns.map(column =>
                    <ColumnContainer
                        key={column.id}
                        column={column}
                        actions={actions}
                    >
                    </ColumnContainer>)
                }
                <div className='column-container'>
                    <input type='text'
                           className='add-column-input'
                           onKeyPress={this.handleKeyPress}
                           placeholder='Add a column...'
                    />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    columns: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    columns: getColumns(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(KanbanActions, dispatch)
});

export const AppConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
