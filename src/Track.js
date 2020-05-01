import React, { Component } from 'react';
import ReactModal from 'react-modal';
// import Tracks from './Tracks';
import UpdateForm from './UpdateForm';
import './Track.css';
import ReactCardFlip from 'react-card-flip';
import ReactPlayer from 'react-player';
import playButton from './play_button.png';
import pauseButton from './pause_button.png';

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped : false,
            playing : false,
            icon : playButton,
            showUpdateModal : false,
            track : this.props.track,
            id : this.props.track._id
        };

        this.handleOpenUpdateModal = this.handleOpenUpdateModal.bind(this);
        this.handleCloseUpdateModal = this.handleCloseUpdateModal.bind(this);

        this.handleFlip = this.handleFlip.bind(this);

        this.handlePlayPause = this.handlePlayPause.bind(this);
    };

    handleFlip(event) {
        event.preventDefault();
        this.setState(prevState => ({ isFlipped : !prevState.isFlipped }));
        this.setState({ playing : false });
        this.setState({ icon : playButton })
        this.resetTrack();
    };

    resetTrack = () => {
        this.rp.seekTo(0);
    };
    
    handlePlayPause(event) {
        event.preventDefault();
        console.log(this.state.icon)
        this.setState(prevState => ({ playing : !prevState.playing }));
        if (this.state.playing === true) {
            this.setState({ icon : playButton });
        } else {
            this.setState({ icon : pauseButton });
        };
        console.log(this.state.icon)
    };

    handleOpenUpdateModal() {
        this.setState({ showUpdateModal : true });
    };

    handleCloseUpdateModal() {
        this.setState({ showUpdateModal : false })
    };

    refreshPage = () => {
        window.location.reload(false);
    };

    deleteTrack = (id) => {
        let result = window.confirm("Are you sure you want to delete this track?");
        if (result) {
            const url = process.env.REACT_APP_API_URL;
            fetch(`${url}/${this.state.track._id}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(console.log(`Deleted ID: ${this.state.track._id}`))
                .then(this.refreshPage)
        };
    };
    
    render()  {
        return(
            <div className="track" key={this.state.track._id}>
                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                    <div className="artContainer">
                        <input type="image" className="albumArt" src={`${this.state.track.url}`} alt={this.state.track._id} onClick={this.handleFlip}/>
                    </div>
                    <div className="behindArt">
                        <input type="button" className="trackExitButton" onClick={this.handleFlip}/>
                        <div className="text">
                            <div className="pair">
                                <div className="header" id="trackTitle">Title:</div>
                                <div className="content">{this.state.track.track_title}</div>
                            </div>
                            <div className="pair">
                                <div className="header" id="artist">Artist:</div>
                                <div className="content">{this.state.track.artist}</div>
                            </div>
                            <div className="pair">
                                <div className="header" id="album">Album:</div>
                                <div className="content">{this.state.track.album}</div>
                            </div>
                            <div className="pair">
                                <div className="header" id="genre">Genre:</div>
                                <div className="content">{this.state.track.genre}</div>
                            </div>
                            <div className="pair">
                                <div className="header" id="yearReleased">Year:</div>
                                <div className="content">{this.state.track.year_released}</div>
                            </div>
                        </div>
                        <div className="musicPlayer">
                            <div className="playPauseButtons">
                                <input type="image" className={this.state.playing ? "pauseButton" : "playButton"} src={this.state.icon} alt="play_pause_button" onClick={this.handlePlayPause}/>
                            </div>
                            <ReactPlayer className="react-player" playing={this.state.playing} url={this.state.track.video} ref={rp => this.rp = rp} width='0px' height='0px'/>
                        </div>
                        <div className="buttons">
                            <button className="editButton" onClick={this.handleOpenUpdateModal}>Edit</button>
                            <ReactModal className="addModal" isOpen={this.state.showUpdateModal}>
                                <div className="modalContent">
                                    <div className="modalHeaderEdit">Make Some Changes</div>
                                    <UpdateForm track={this.state.track} refresh={this.props.refresh}/>
                                    <div className="cancelButtonContainer">
                                        <button className="addCancelButton" onClick={this.handleCloseUpdateModal}>Cancel</button>
                                    </div>
                                </div>
                            </ReactModal>
                            <button className="deleteButton" onClick={this.deleteTrack}>Delete</button>
                        </div>
                    </div>
                </ReactCardFlip>
            </div>
        );
    };
};

export default Track;