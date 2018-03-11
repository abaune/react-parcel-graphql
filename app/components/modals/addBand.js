import React from 'react';

class AddBand extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            favoriteSong: '',
            description: '',
            stars: 0
        };
    }

    /**
     * Calls action to add a band.
     */
    saveNewBand() {
        this.props.requestActions.addBand({
            name: this.state.name,
            favoriteSong: this.state.favoriteSong,
            description: this.state.description,
            stars: this.state.stars
        }).then(this.props.saveNewBand);
    }

    /**
     * Updates state for the corresponding dataAttribute field.
     * @param {Object} evt The event that took place 
     */
    updateValue(evt) {
        let dataAttribute = evt.target.getAttribute('data-attribute');
        this.setState({[dataAttribute]: evt.target.value});
    }

    render() {
        return (
            <div className='add-band' onClick={this.props.closeModal}>
                <div className='form' onClick={evt => evt.stopPropagation()}>
                    <span className='title'>AddBand</span>
                    <div className='content'>
                        <div>
                            <span>Band Name: </span>
                            <input data-attribute='name' onChange={this.updateValue.bind(this)} type='text' value={this.state.name}/>
                        </div>
                        <div>
                            <span>Favorite Song: </span>
                            <input data-attribute='favoriteSong' onChange={this.updateValue.bind(this)} type='text' value={this.state.favoriteSong}/>
                        </div>
                        <div>
                            <span>Description: </span>
                            <input data-attribute='description' onChange={this.updateValue.bind(this)} type='text' value={this.state.description}/>
                        </div>
                        <div>
                            <span>Stars: </span>
                            <input data-attribute='stars' onChange={this.updateValue.bind(this)} type='number' value={this.state.stars}/>
                        </div>
                    </div>
                    <div className='footer'>
                        <button onClick={this.props.closeModal}>Close</button>
                        <button onClick={this.saveNewBand.bind(this)}>Save</button>
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = AddBand;
