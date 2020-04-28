import React, { Component } from 'react';
import Tracks from './Tracks';

class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.tracks = new Tracks();
        this.state = {
            // track : this.props.track,
            // _id : this.props.track._id,
            track_title : this.props.track.track_title,
            artist : this.props.track.artist,
            album : this.props.track.album,
            genre : this.props.track.genre,
            year_released : this.props.track.year_released,
            url : this.props.track.url
        };
    };

    handleChange = ({ target }) => {
        const key = target.name;
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    };

    refreshPage = () => {
        window.location.reload(false);
    };

    renderOnSubmit = (event) => {
            event.preventDefault();

            console.log(`Updated ID: ${this.props.track._id}`);

            const url = process.env.REACT_APP_API_URL;
            fetch(`${url}/${this.props.track._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)
            }).then(this.refreshPage)
            .then(() => {
                this.setState({
                    isAdd: true,
                    _id : '',
                    track_title : '',
                    artist : '',
                    album : '',
                    genre : '',
                    year_released : '',
                    url : ''
                })
            });
    };

    render() {
        return (
            <div className="formContainer">
                <form onSubmit={this.renderOnSubmit} className="form">
                    <div className="inputs">
                        <div className="title">
                            <label className="Label">Title: </label>
                            <input type="text" className="Field" name="track_title"
                            value={this.state.track_title} onChange={this.handleChange}/>
                        </div>
                        <div className="artist">
                            <label className="Label">Artist: </label>
                            <input type="text" className="Field" name="artist"
                            value={this.state.artist} onChange={this.handleChange}/>
                        </div>
                        <div className="album">
                            <label className="Label">Album: </label>
                            <input type="text" className="Field" name="album"
                            value={this.state.album} onChange={this.handleChange}/>
                        </div>
                        <div className="genre">
                            <label className="Label">Genre: </label>
                            <input type="text" className="Field" name="genre"
                            value={this.state.genre} onChange={this.handleChange}/>
                        </div>
                        <div className="year_released">
                            <label className="Label">Year Released: </label>
                            <input type="number" min="0" max="2050" className="Field" 
                            name="year_released" value={this.state.year_released} 
                            onChange={this.handleChange}/>
                        </div>
                        <div className="url">
                            <label className="Label">Album Art URL:</label>
                            <input type="text" className="Field" name="url"
                            value={this.state.url} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <input type="submit" className="submitButton" value="Save"/>
                </form>
            </div>
        );
    };
};

export default UpdateForm;