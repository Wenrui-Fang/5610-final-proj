import React from 'react';
import reviewService from "../service/reviewService";
import applicationService from "../service/applicationService";
import foodService from "../service/foodService";

class Detail extends React.Component {
    state = {
        details: {},
        reviews: [],
        yourComment: "No comments",
        applications: [],
        localDetails: {},
        accessToken: null,
    }

    componentDidMount() {
        foodService.findDetailById(this.props.id)
            .then(response => this.setState({
                details: response.data.food
            }))

        this.findReviewsForFood();
        this.findApplicationsForFood();
    }

    findReviewsForFood = () => {
        reviewService.findReviewsForFood(this.props.id).then(reviews => this.setState({
            reviews: reviews
        }))
    }

    findApplicationsForFood = () => {
        applicationService.findApplicationsForFood(this.props.id)
            .then(applications => this.setState({
                applications: applications
            }))
    }

    createNewReview = (review) => {
        reviewService.createReview(this.props.id, review)
            .then(actual => {
                return this.findReviewsForFood()
            })
    }

    createNewApplication = (application) => {
        applicationService.createApplication(this.props.id, application)
            .then(actual => {
                return this.findApplicationsForFood()
            })
    }

    gotoProfile = (userId) => {
        if (userId === this.props.currentUser.id)
            this.props.history.push("/profile")
        else
            this.props.history.push('/profile/' + userId)
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="bottom">
                    <div className="row" >
                        <div className="col-9">
                            <div className="card col-margin-left">
                                { this.state.details && this.state.details.photos &&
                                    <img className="card-img-top" src={this.state.details.photos[0].large} height="620px"
                                         width="auto" alt="Oops!  lost!"/>
                                }

                                <div className="card-body">
                                    <h5 className="card-title title-bold">{this.state.details.name}</h5>
                                    <p className="card-text">{this.state.details.description}</p>
                                </div>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Food Type: {this.state.details.type}</li>
                                    <li className="list-group-item">Location: {this.state.details.location}</li>
                                    <li className="list-group-item">Business Hours: {this.state.details.hour}</li>
                                    <li className="list-group-item">Price Range: {this.state.details.price}</li>
                                </ul>
                            </div>
                            <h5 className="title mt-3">Comments</h5>
                            <div className="row">
                                {
                                    this.state.reviews.length === 0 &&
                                    <h6 className="comments-title review-subtitle">No comments yet!
                                        Be the first to comment!
                                    </h6>

                                }
                                {   this.props.currentUser.username === '' &&
                                    <h5>( <a href={"/login"}>Login</a>  required)</h5>
                                }
                                <div className="row">
                                    {
                                        this.state.reviews && this.state.reviews.map((review, i) =>
                                            <div className="col-sm-4 card-bottom-margin" key={i}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        { this.props.currentUser.username !== '' &&
                                                            <h5 className="card-title title-pointer">
                                                    <span onClick={() => this.gotoProfile(review.userId)}>
                                                        {review.username}
                                                    </span>
                                                            </h5>
                                                        }
                                                        {
                                                            this.props.currentUser.username === '' &&
                                                            <h5 className="card-title">

                                                                {review.username}

                                                            </h5>
                                                        }
                                                        <p className="card-text">{review.content}</p>
                                                    </div>
                                                </div>
                                            </div>)
                                    }
                                </div>
                                { this.props.currentUser.username !== '' &&
                                    <div className="row">
                                        <form className="col-5">
                                            <div class="form-group">
                                                <label for="exampleFormControlTextarea1">Comments</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                                          onChange={(e) => {
                                                              const comment = e.target.value
                                                              this.setState({
                                                                  yourComment: comment
                                                              })
                                                          }}>
                                        </textarea>
                                            </div>

                                            <button type="submit"
                                                    className="btn btn-primary"
                                                    onClick={() => this.createNewReview({
                                                        userId: this.props.currentUser.userId,
                                                        username: this.props.currentUser.username,
                                                        petTitle: this.state.details.name,
                                                        content: this.state.yourComment,
                                                        petImageURL: this.state.details.photos[0].large
                                                    })}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-center app-title">Applications for {this.state.details.name}</h4>
                            {this.props.currentUser.username === '' &&<h5>( <a href={"/login"}>Login</a>  required)</h5>}

                            {
                                this.state.applications.length === 0 &&
                                <h6 className="text-center tips">No applications yet! Be the first to apply!</h6>
                            }

                            { this.state.applications.length !== 0 && this.state.applications.map((application, i) =>
                                <span className="list-group-item col-margin-right">{application.username}</span>)
                            }


                            { this.props.currentUser.username !== '' &&

                                <div className="col-margin-right">
                                    <button className="apply-button btn btn-block btn-primary"
                                            onClick={() => this.createNewApplication({
                                                userId: this.props.currentUser.userId,
                                                username: this.props.currentUser.username,
                                                petTitle: this.state.details.name,
                                                petImageURL: this.state.details.photos[0].large
                                            })}>

                                        Apply now</button>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Detail;