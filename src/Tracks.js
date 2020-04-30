import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Track from './Track';
import AddForm from './AddForm';

class Tracks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tracks : [],
            showAddModal : false,
            key : '',
            value : '',
        };

        this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
    };

    handleSearch = ( { target } ) => {
        const key = target.name;
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    getTracks = () => {
        const url = process.env.REACT_APP_API_URL;
        fetch(`${url}`)
            .then(response => response.json())
            .then(data => this.setState({ tracks : data }))
            .catch(err => err);
    };

    getTracksByValue = (event) => {
        event.preventDefault();
        const newValue = this.state.value.replace(/ /g,'-');

        const url = process.env.REACT_APP_API_URL;
        fetch(`${url}/${this.state.key}/${newValue}`)
            .then(response => response.json())
            .then(data => this.setState({ tracks : data }))
            .catch(err => err);
    };

    handleOpenAddModal() {
        this.setState({ showAddModal : true });
    };

    handleCloseAddModal() {
        this.setState({ showAddModal : false });
    };

    componentDidMount() {
        this.getTracks();
    };

    render() {
        const displayTracks = this.state.tracks.map((track) => {
            return (
                <>
                    <div className="tiles" key={track._id}>
                        <Track key={track._id}
                        track={ track } refresh={this.getTracks}/>
                    </div>
                </>
            );
        });

        return (
            <div>  
                <div className="totality">
                    <div className="background">
                        <div className="backgroundImg"></div>
                    </div>
                    <div className="mainTitle">
                        <div className="title">Sonic Acuity</div>
                    </div>
                    <div className="blackSpace"/>
                    <div className="mainBody">
                        <div className="searchBarContainer">
                            <div className="searchBarTitle">What are you looking for?</div>
                            <form className="searchBar" onSubmit={this.getTracksByValue}>
                                <select name="key" className="searchDropDown" value={this.state.key} onChange={this.handleSearch}>
                                    <option name="blackSpace" value="blankSpace"></option>
                                    <option name="track_title" value="track_title">Title</option>
                                    <option name="artist" value="artist">Artist</option>
                                    <option name="album" value="album">Album</option>
                                    <option name="genre" value="genre">Genre</option>
                                </select>
                                <input type="text" name="value" className="searchField" placeholder="Search..." value={this.state.value} onChange={this.handleSearch}/>
                                <input type="submit" className="searchButton" value="Search"/>
                            </form>
                        </div>
                        <div className="tileContainer">
                            <div className="tileRows">{ displayTracks }</div>
                        </div>
                    </div>
                    <div>
                        <div></div>
                        <div className="addButtonContainer">
                            <div className="addText">Missing some?</div>
                            <button className="addButton" onClick={this.handleOpenAddModal}>Add to the Collection</button>
                            <ReactModal className="addModal" isOpen={this.state.showAddModal}>
                                <div className="modalContent">
                                    <div className="modalHeader">Add a Favorite</div>
                                    <AddForm className="formCall" refresh={this.getTracks}/>
                                    <div className="cancelButtonContainer">
                                        <button className="addCancelButton" onClick={this.handleCloseAddModal}>Cancel</button>
                                    </div>
                                </div>
                            </ReactModal>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Tracks;