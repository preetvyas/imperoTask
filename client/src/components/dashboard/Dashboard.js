import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
const columns = [
  {
    name: "id",
    label: "Id",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "companyId",
    label: "CompanyId",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "birthDate",
    label: "BirthDate",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "joiningDate",
    label: "JoiningDate",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "resignationDate",
    label: "ResignationDate",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "salary",
    label: "Salary",
    options: {
      filter: true,
      sort: false,
    }
  },
];

const data = [
  { id: "1", companyId: "TerseSoft", name: "priti", birthDate: "1994-08-12", joiningDate: "2014-01-05", resignationDate: "2018-01-05", salary: "400000" },
  { id: "2", companyId: "Tech Mahindra", name: "ram", birthDate: "1993-04-12", joiningDate: "2015-01-05", resignationDate: "2019-01-05", salary: "400000" },
  { id: "3", companyId: "Tcs", name: "Mohan", birthDate: "1996-03-12", joiningDate: "2018-01-05", resignationDate: "", salary: "400000" },

];

const options = {
  filterType: 'dropdown',
  download: false,
  print: false,
  viewColumns: false,
  filterTable: true
};
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div  className="container row">
      
          {/* <div className="landing-copy col s12 center-align"> */}
            <h1>Employee List</h1>
            <Link
                to="/company"
              
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
               Go Company Details
              </Link>&nbsp;&nbsp;&nbsp;
              <button
            
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button> 
          <div className="row">
            <div className="col-md-12">
            
              <div className="col-md-12">
                <MUIDataTable
                  title={"Employee List"}
                  data={data}
                  columns={columns}
                  options={options}
                />

              </div>
            </div>
          </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
