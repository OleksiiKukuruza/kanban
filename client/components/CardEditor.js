import './CardEditor.scss';
import React, { Component, PropTypes } from 'react';

export class CardEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    handleChange = event => {
        this.setState({text: event.target.value});
    };

    handleAddClick = () => {
        if (this.state.text.trim()) {
            const {onAddCard} = this.props;
            onAddCard(this.state.text);
            this.setState({text: ''});
        }
    };

    render() {
        const {onEditorToggle} = this.props;

        return (
            <div className='card-editor'>
                <div className='card-editor-textarea_wrapper'>
                    <textarea
                        className='card-editor-textarea'
                        rows='3'
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                </div>
                <div className='card-editor_buttons'>
                    <button
                        className='button-general fa fa-times'
                        onClick={onEditorToggle}
                    />
                    <button
                        className='button-primary'
                        onClick={this.handleAddClick}>
                        Add
                    </button>
                </div>
            </div>
        );
    };
}
