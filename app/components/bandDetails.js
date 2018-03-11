import React from 'react';

class BandDetails extends React.Component {
   
    /**
     * Returns the starts markup for the band detail.
     * @return {Markup} The stars markup
     */
    getStarsMarkup() {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < this.props.stars) {
                stars.push(<div key={i} className='filled'><i className='fa fa-star'/></div>);
            }
            else {
                stars.push(<div key={i} className='empty'><i className='fa fa-star'/></div>);
            }
        };

        return (
            <div className='stars'>
                {stars}
            </div>
        );
    }

    render() {
        return (
            <div className='band-details'>
                <div className='top'>
                    <i className='fa fa-users'/>
                    <div>
                        <span className='title'>{this.props.title}</span>
                        {this.getStarsMarkup()}
                    </div>
                </div>
                <div className='bottom'>
                    <span className='description'>
                        {this.props.description}
                    </span>
                </div>
            </div>
        );
    }
}

module.exports = BandDetails;
