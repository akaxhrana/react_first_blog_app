import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { FaUserCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import api from "../api";
import { UpdatePost, DeletePost } from "../components/UpdateAndDeletePost";
import Moment from "moment";
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      id: "",

      data: [],
      offset: 0,
      perPage: 1,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount = async () => {
    const user = await AuthService.getCurrentUser();
    if (user) {
      this.setState({
        username: user.data.username,
        email: user.data.email,
        id: user.data._id,
      });
      this.receivedData();
    }
    if (!user) {
      this.props.history.push("/");
    }
  };
  receivedData = async () => {
    const name = this.state.username;
    await api.getPostByName(name).then((res) => {
      const data = res.data.data;

      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      //mapping 'sliced data' to the react fragment

      const postData = slice.map((pd) => (
        <>
          <div className="row justify-content-center">
            <div key={pd._id} className=" col-md-6 card mt-5 p-2 border-0">
              <div className="card-body shadow">
                <h1 className="card-title">{pd.title}</h1>
                <p>
                  Posted at:&nbsp;
                  {Moment(Moment(pd.created_at).toString()).format(
                    "DD-MM-YYYY hh:mm A"
                  )}
                </p>

                <hr />
                <p className="card-text">{pd.description}</p>
              </div>
            </div>
            <div className="col col-md-7 ">
              <UpdatePost id={pd._id} />
              <DeletePost id={pd._id} name={pd.title} />
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

  render() {
    const { username, email, id } = this.state;

    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 shadow rounded mt-2">
            {/*above horizontal line*/}

            <div className="row justify-content-center p-4">
              <FaUserCircle size={90} />
              <h3 className="border-bottom w-100 text-center p-3">
                {username}
                <h6 className="p-1">{email}</h6>
              </h3>
            </div>
            {/* Right Side Buttons */}
            <div className="row pb-4">
              <div className="d-md-flex d-none col-md-10 flex-row bd-highlight pl-4 justify-content-start">
                <a
                  href=""
                  className="text-decoration-none p-2 bd-highlight text-secondary border-right d-none d-md-block"
                >
                  Followers
                </a>
                <a
                  href=""
                  className="text-decoration-none p-2 bd-highlight text-secondary border-right d-none d-md-block"
                >
                  Posts
                </a>
                <a
                  href=""
                  className="text-decoration-none p-2 bd-highlight text-secondary d-none d-md-block "
                >
                  About
                </a>
              </div>
              <div className="col-12 col-md-2 justify-content-center d-flex">
                <button className="p-2 btn btn-danger align-self-center">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.postData}
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
              subContainerClassName={"pages pagination m-2"}
              previousLinkClassName={"previous_page text-dark bg-warning p-1"}
              nextLinkClassName={"next_page text-dark bg-warning p-1"}
              pageLinkClassName={"p-1 bg-secondary m-2"}
              disabledClassName={"disabled"}
              activeClassName={"active "}
            />
          </div>
        )}
      </div>
    );
  }
}
