import React from 'react';

// Components
import BandDetails from './bandDetails';
import EditUser from './modals/editUser';
import AddBand from './modals/addBand';

// Actions
import requestActions from '../server/requestActions';

class BandsLandingPage extends React.Component {
    constructor() {
        super();

        this.state = {
            allBands: [],
            user: {},
            modal: null,
        };
    }

    /**
     * Fetches all of our bands from the fake database and updates state to them.
     */
    componentWillMount() {
        requestActions.getLandingpageDetails(1).then((details) => {
            this.setState({
                allBands: details.getAllBands,
                user: details.getUser
            });
        });
    }

    /**
     * Closes the active modal by setting modal state to null.
     */
    closeModal() {
        this.setState({modal: null});
    }

    /**
     * Saves the user data when clicking save buton by setting user state and closing the modal.
     * @param {Object} user The user object from graphql
     */
    saveEditedUserName(user) {
        this.setState({user: user.editUserName, modal: null});
    }

    /**
     * Opens the edit user modal by setting modal stat to the EditUser component
     */
    openEditUserModal() {
        this.setState({
            modal: <EditUser
                closeModal={this.closeModal.bind(this)}
                saveUserName={this.saveEditedUserName.bind(this)}
                name={this.state.user.name}
                requestActions={requestActions} />
        });
    }

    /**
     * Saves a new band by setting allBands state with an updated bands array.
     * @param {Object} band The band object coming from graphql
     */
    saveNewBand(band) {
        let updatedState = this.state.allBands.slice(0);
        updatedState.push(band.addBand);
        this.setState({allBands: updatedState, modal: null});
    }

    /**
     * Opens the add band modal by setting modal state to the AddBand component.
     */
    openAddbandModal() {
        this.setState({
            modal: <AddBand
            closeModal={this.closeModal.bind(this)}
            requestActions={requestActions}
            saveNewBand={this.saveNewBand.bind(this)} />
        });
    }

    /** 
     * Returns the markup for each band in our database else loading.
     * @return {Markup|Object[]} The markup for our band from the fake database
     */
    getBandsMarkup() {
        if(this.state.allBands.length) {
            let bandMarkup = this.state.allBands.map((band, index) => { 
                return (
                <BandDetails
                    key={`${band.name}-${index}`}
                    title={band.name}
                    description={band.description}
                    stars={band.stars}/>
                );
            });
            
            return bandMarkup.slice(0, 3);
        }

        return <div className='loading'>Loading...</div>;
    }

    /**
     * Updates the allBands state by unshifting the last band in the list.
     */
    handleRightClick() {
        const updatedBands = this.state.allBands.slice(0);
        updatedBands.unshift(updatedBands.pop());
        this.setState({allBands: updatedBands});
    }

    /**
     * Updates the allBands list by pushing the first band in the list.
     */
    handleLeftClick() {
        const updatedBands = this.state.allBands.slice(0);
        updatedBands.push(updatedBands.shift());
        this.setState({allBands: updatedBands});
    }

    render() {
        return (
            <div className='bands-landing-page'>
                {this.state.modal}
                <div className='header'>
                    <span>
                        Bands Landing Page
                    </span>
                </div>
                <div className='row'>
                    <span>
                        {this.state.user.name && this.state.user.name.length ? `${this.state.user.name}'s Bands` : ''}
                    </span>
                    <button onClick={this.openAddbandModal.bind(this)}>Add a band</button>  
                    <button onClick={this.openEditUserModal.bind(this)}>Edit User</button>
                </div>
                <div className='body'>
                    <div className='bands'>
                        <div className='icon' onClick={this.handleLeftClick.bind(this)}>
                            <i className='fa fa-arrow-left' />
                        </div>
                        {this.getBandsMarkup()}
                        <div className='icon' onClick={this.handleRightClick.bind(this)}>
                            <i className='fa fa-arrow-right' />
                        </div>
                    </div>
                </div>         
            </div>
        );
    }
}

module.exports = BandsLandingPage;
