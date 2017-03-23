var Poster = React.createClass({
  render: function() {
    return (
    <div className="media-left">
      <a href={imdbUrl} target="_blank">
        <img className="media-object" src={this.props.poster} width="90" />
      </a>
    </div>
    );
  }
});

var Card = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var component = this;
    $.get("https://www.omdbapi.com/?t=" + this.props.login +"&plot=full", function(data) {
      component.setState(data);
    });
  },
  render: function() {
    if (this.state.Response) {
      var imdbUrl = "http://www.imdb.com/title/" + this.state.imdbID;
    return (
      <div className="jumbotron">
        <div className="media">
          <div className="media-left">
            <a href={imdbUrl} target="_blank">
              <img className="media-object" src={this.state.Poster} width="90" />
            </a>
            
            <div className="media">
              <span className="glyphicon glyphicon-flag"/> {this.state.Country}
              <br/>
              <span className="glyphicon glyphicon-time"/> {this.state.Runtime}
              <br/>
              <span className="glyphicon glyphicon-volume-up"/> {this.state.Language}
            </div>
            
            <div className="media">
              {this.state.Rated}
            </div>
            
            <div className="media">
              <a href={imdbUrl} target="_blank">
                <img alt="IMDb Rating" src="http://ia.media-imdb.com/images/G/01/imdb/images/plugins/imdb_46x22-2264473254._CB522736238_.png"
                      height="20"/>
              </a>
              &nbsp;
              <b>{this.state.imdbRating}</b>
            </div>
            
            <div className="media">
              <img alt="Metacritic Score" src="http://static.metacritic.com/images/icons/mc_fb_og.png" height="20"/>
              &nbsp;
              <b><span className="text align-center">
                {this.state.Metascore}
              </span></b>
            </div>
          </div>
          
          <div className="media-body">
            <h4 className="media-heading"><b>{this.state.Title}</b>&nbsp;({this.state.Year})</h4>
            {this.state.Genre}
            <br/>
            
            <div className="well">
                {this.state.Plot}
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <span className="glyphicon glyphicon-facetime-video"/> Cast
              </div>
              <div className="panel-body">
                {this.state.Actors}
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <span className="glyphicon glyphicon-film"/> Directed by
              </div>
              <div className="panel-body">
                {this.state.Director}
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <span className="glyphicon glyphicon-pencil"/> Written by
              </div>
              <div className="panel-body">
                {this.state.Writer}
              </div>
            </div>
          </div>
        </div>
      </div>
    );  
    }
    else {
      return (
        <div className="alert alert-warning">
          <strong>Ooops!</strong> API response was false.
        </div>
        );
    }
  }
});

var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var loginInput = React.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function() {
    return (
      <div className="panel">
        <form onSubmit={this.handleSubmit} className="navbar-form navbar-left">
            <div className="input-group">
                <input placeholder="movie name" ref="login" type="text" className="form-control" />
                
                <span className="input-group-btn">
                  <button type="button" onClick={this.handleSubmit} className="btn btn-default">Search</button>
              </span>
          </div>
        </form>
      </div>
    );
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {logins: []};
  },
  addCard: function(loginToAdd) {
    this.setState({logins: this.state.logins.concat(loginToAdd)});
  },
  render: function() {
    var cards = this.state.logins.map(function(login) {
      return (<Card login={login} />);
    });
    return (
      <div className="panel" >
        <Form addCard={this.addCard} /> 
        <div className="panel panel-body">
          {cards}
        </div>
      </div>
    )
  }
});

React.render(<Main />, document.getElementById("root"));