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
            // key : '',
            // value : '',
            // search : {}
        };

        this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);

        // this.handleOpenUpdateModal = this.handleOpenUpdateModal.bind(this);
        // this.handleCloseUpdateModal = this.handleCloseUpdateModal.bind(this);
    };

    // handleSearch = ( { target } ) => {
    //     const key = target.name;
    //     this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    // }

    getTracks = () => {
        const url = process.env.REACT_APP_API_URL;
        fetch(`${url}`)
            .then(response => response.json())
            .then(data => this.setState({ tracks : data }))
            .catch(err => err);
    };

    // getTracksByValue = (key, value) => {
    //     let newValue = value.replace(/ /g,"_")

    //     const url = process.env.REACT_APP_API_URL;
    //     fetch(`${url}/${key}/${newValue}`)
    //         .then(response => response.json())
    //         .then(data => this.setState({ track : this.state.search }))
    //         .catch(err => err);

    //     window.location.replace(`${url}/${key}/${value}`)
    // };

    handleOpenAddModal() {
        this.setState({ showAddModal : true });
    };

    handleCloseAddModal() {
        this.setState({ showAddModal : false });
    };

    // addTrack() {
    //     let result;
    //     this.setState({
    //         isAdd : true
    //     });
    //     result = <TrackForm key="addForm" isAdd={this.state.isAdd} track={this.state.updateTrack} refresh={this.getTracks}/>
    //     return result;
    // };

    // handleOpenUpdateModal() {
    //     this.setState({ showUpdateModal : true });
    // };

    // handleCloseUpdateModal() {
    //     this.setState({ showUpdateModal : false })
    // }

    // updateTrack = (track) => {
    //     let result;
    //     this.setState({
    //         isAdd : false,
    //         showUpdateModal : true,
    //         updateTrack : track
    //     });
    //     const data = this.state.updateTrack;
    //     result = <UpdateForm key={data._id} relative={data} refresh={this.getTracks}/>
    //     return result;
    // };

    // deleteTrack = (id) => {
    //     const url = process.env.REACT_APP_API_URL;
    //     fetch(`${url}/${id}`, {
    //         method: "DELETE"
    //     })
    //         .then(response => response.json())
    //         .then(console.log(`Deleted ID: ${this.state.track_id}`))
    //         .then(this.getTracks);
    // };

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
                        <div className="title">Sonic Acuity.</div>
                    </div>
                    <div className="blackSpace"/>
                    <div className="mainBody">
                        <div className="searchBarContainer">
                            <div className="searchBarTitle">Do I have what you're looking for?</div>
                            <form className="searchBar" onSubmit={this.getTracksByValue}>
                                <select className="searchDropDown" value={this.state.key} onChange={this.handleSearch}>
                                    <option value="blankSpace"></option>
                                    <option value="track_title">Title</option>
                                    <option value="artist">Artist</option>
                                    <option value="album">Album</option>
                                    <option value="genre">Genre</option>
                                </select>
                                <input type="text" className="searchField" placeholder="Search..." value={this.state.value} onChange={this.handleSearch}/>
                                <input type="submit" className="searchButton" value="Search"/>
                            </form>
                        </div>
                        <div className="tileContainer">
                            <div className="tileRows">{ displayTracks }</div>
                        </div>
                    </div>
                    <div></div>
                    <div className="addButtonContainer">
                        <div className="addText">Did I miss some?</div>
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
        );
    };
};

export default Tracks;