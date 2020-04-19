import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
const columns = [
  {
   name: "year",
   label: "Year",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "totalEmployee",
   label: "TotalEmployee",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "totalsalary",
   label: "TotalSalary",
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
  }
 ];
  
 const data = [
  { year: "2019", totalEmployee: "2", totalsalary: "900000", name: "Terse soft"},
  { year: "2018", totalEmployee: "20", totalsalary: "40000", name: "Tech mahindra"},
  { year: "2017", totalEmployee: "14", totalsalary: "70000", name: "Tcs"},


 ];
  
 const options = {
   filterType: 'dropdown',
   download: false,
    print: false,
    viewColumns: false,
    filterTable: true
 };
  
  
//  const options = {
//   filterType: 'dropdown',
//   pagination: true,
//   search: true,
//   filter: true,
//   download: false,
//   print: false,
//   viewColumns: false,
//   toolbar: false,
//   filterTable: false,
//   searchOpen: true,
// };

class Company extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    const { user } = this.props.auth;

    return (
      <div className="container row">
        <h1>Company List</h1>
        <Link
                to="/dashboard"
              
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
               Go Employee Details
              </Link>&nbsp;&nbsp;&nbsp;
              <button
            
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button> 
        <div className="col-md-12">
        <MUIDataTable
  title={"Company List"}
  data={data}
  columns={columns}
  options={options}
/>

        </div>
        
       
      </div>
    );
  }
}

Company.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Company);
