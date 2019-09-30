import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import { Link } from 'react-router-dom';
const { IS_LOGGED_IN, FETCH_USER } = Queries;

class Home extends React.Component {

  render() {
    return (
      <Query query={IS_LOGGED_IN} >
        {
          ({ loading, error, data: log_data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return (
              <Query query={FETCH_USER} variables={{id: log_data._id}}>
                {
                  ({ loading2, error2, data: user_data }) => {
                    if (loading2) return <p>Loading...</p>;
                    if (error2) return <p>Error</p>;
                    // console.log(user_data.user);
                    let checkins = user_data.user ? user_data.user.tacoCheckin.map(checkin => {
                      return (
                        <div className="taco-checkin-box">
                          <img className="profile-pic"
                            src={user_data.user.photo}></img>
                          <div className="checkin-info">
                            <Link>{checkin.name}</Link> is eating a
                                    <Link to={`/taco/${checkin.taco._id}`}> {checkin.taco.name}</Link> by
                                    <Link to={`/restaurant/${checkin.taco.restaurant._id}`}> {checkin.taco.restaurant.name}</Link>
                            
                            <div className="description-and-rating">{checkin.description}</div>

                          </div>
                            
                          {/* <div className="taco-pic"></div> */}
                        </div>
                      );
                    }) : <p className="no-activity">
                    You don't seem to have any recent activity. <br/>
                    Get out there and eat some tacos!
                  </p>;
                  


                  return (
                    <div className="homepage">
                      <div className="home-left">
                        <div className="recent-activity">
                          <h3>Your Recent Activity</h3>
                          <div className="activity-content">
                            {checkins}
                          </div>
                        </div>
                      </div>
                      <div className="home-right">
                        <div className="home-profile">
                          <div className="user-info">
                            <div className="user-avatar">
                              <Link to={`/users/${log_data._id}`}>
                                <img src={log_data.photo}></img>
                              </Link>
                            </div>
                            <div className="info">
                              <h2>{log_data.firstName + " " + log_data.lastName}</h2>
                              <p>{log_data.username}</p>
                            </div>
                          </div>
                          <div className="prof-stats">
                            <a className="total">
                              <span className="stat">Count</span>
                              <span className="title">Total</span>
                            </a>
                            <a className="unique">
                              <span className="stat">Count</span>
                              <span className="title">Unique</span>
                            </a>
                            <a className="badges">
                              <span className="stat">0</span>
                              <span className="title">Badges</span>
                            </a>
                            <a className="friends">
                              <span className="stat">0</span>
                              <span className="title">Friends</span>
                            </a>
                          </div>
                        </div>
                        <div className="home-lists">
                          <h3>Lists</h3>
                        </div>
                      </div>
                    </div>
                  );
                }
            }
          
          </Query>
        )
        }
        }
      </Query>
    )
  }
}

export default Home;