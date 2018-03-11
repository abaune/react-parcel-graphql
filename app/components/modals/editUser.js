import React from 'react';

class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name || ''
        };
    }

    /**
     * Sets the name state.
     * @param {Object} evt The event that took place 
     */
    updateUserName(evt) {
        this.setState({name: evt.target.value});
    }

    /** 
     * Calls the action to edit the user's name.
     */
    saveUserName() {
        this.props.requestActions.editUserName(1, this.state.name).then(this.props.saveUserName);
    }

    render() {
        return (
            <div className='edit-user' onClick={this.props.closeModal}>
                <div className='form' onClick={evt => evt.stopPropagation()}>
                    <span className='title'>Edit User</span>
                    <div className='content'>
                        <span>User Name: </span>
                        <input onChange={this.updateUserName.bind(this)} type='text' value={this.state.name}/>
                    </div>
                    <div className='footer'>
                        <button onClick={this.props.closeModal}>Close</button>
                        <button onClick={this.saveUserName.bind(this)}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = EditUser;
