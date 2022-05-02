import React from "react";

class Park extends Component {

    render() {
        const { stateparks } = this.props;
        return (
            <React.Fragment>
                <div className="row px-1">
                {parks.length > 0 ? (
                    parks.map(park => (
                    <div className="col-lg-4 col-md-6 col-sm-12" key={park._id}>
                        <div className="card m-2">
                        <div className="card-body p-0">
                            <img
                            src={park.url}
                            className="card-img-top"
                            alt={park.name + park.id}
                            />
                            <div className="p-2">
                            <h5 className="card-title my-2">{park.name}</h5>
                            <p className="card-text">
                                {park.description.substring(0, 50)} ...
                            </p>
                            <a
                                href={`/stateparks/${park._id}`}
                                className="btn btn-info d-block">
                                Know More
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))
                ) : (
                    <h2 className="px-4">No Park found</h2>
                )}
                </div>
            </React.Fragment>
        )
    }
}

export default Park;