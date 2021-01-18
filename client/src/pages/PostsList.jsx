import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import api from "../api";
import Moment from "moment";
import { Link, withRouter } from "react-router-dom";
/* Inline CSS used */

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      offset: 0,
      perPage: 6,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  receivedData = async () => {
    await api.getAllPosts().then((res) => {
      const data = res.data.data;

      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      //mapping 'sliced data' to the react fragment

      const postData = slice.map((pd) => (
        <>
          <div className="row">
            <div
              key={pd._id}
              className="rounded shadow bg-light col-md-6 card offset-md-3 mt-5 p-2 border-0"
            >
              <div className="card-body">
                <h1 className="card-title">{pd.title}</h1>
                <p>
                  Posted at:&nbsp;
                  {Moment(Moment(pd.created_at).toString()).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </p>
                <p>
                  Posted By:&nbsp;
                  <a className="text-decoration-none text-secondary">
                    <Link to={`/user/${pd.username}`} query={{ name: "query" }}>
                      {" "}
                      {pd.username}
                    </Link>
                  </a>
                </p>
                <hr />
                <p className="card-text">{pd.description}</p>
              </div>
            </div>
          </div>
        </>
      ));

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        postData,
      });
    });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  //waiting for component to load and render data

  componentDidMount() {
    this.receivedData();
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          {/*Rendering the posts and 'paginate'*/}

          {this.state.postData}
        </div>

        {this.state.pageCount > 1 && (
          <div>
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={5}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination justify-content-center mt-5 "}
              subContainerClassName={"pages pagination "}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              pageLinkClassName={"p-2 "}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          </div>
        )}
      </>
    );
  }
}

export default withRouter(PostsList);
