import React, { useEffect, useState } from "react";
import { calculateRange, sliceData } from '../../../utils/table-pagination';

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { instance } from "../../../Intance/intance";



const userUpdate = {
  "id": "",
  "firstName": "",
  "lastName": "",
  "email": "",
  "password": "",
  "token": "",
  "isActive": '',
  "isVerified": Boolean,
  "created_at": "",
  "updated_at": ""
} 



function Users() {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [editData, setEditData] = useState({});
  const [dataIndex ,setDataIndex] = useState([])
  // patch data
  const [userUpdateForm ,setUserUpdateForm] = useState(userUpdate) 
  const [isActiveValue ,setIsActiveValue] = useState()


  console.log('userUpdateFormuserUpdateFormuserUpdateFormuserUpdateForm' ,isActiveValue)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response =  await instance.get('/api/admin-panel/users')
        setUsers(response.data);
        setPagination(calculateRange(response, 5));
        setPage(1);
      } catch (error) {
        throw error;
      }
    }
    fetchUser();
  }, []);
  // select dropdown

  const selectHandleChange = (e) => {
    setIsActiveValue(e.target.value)
    // userUpdateForm.isVerified = e.target.value;
  }


  const handleEditClick = (e , selectIndex) => {
    // setEditData(rowData);
    const newobject = users.find((val ,index) => index  == selectIndex);
    setDataIndex(newobject)
    userUpdateForm.id = newobject.id;
    userUpdateForm.email = newobject.email;
    userUpdateForm.firstName = newobject.firstName;
    userUpdateForm.lastName = newobject.lastName;
    userUpdateForm.password = newobject.password;
    userUpdateForm.token = newobject.token;
    userUpdateForm.isVerified = newobject.isVerified;
    userUpdateForm.isActive = newobject.isActive;
    userUpdateForm.created_at = newobject.created_at;
    userUpdateForm.updated_at = newobject.updated_at;
    console.log('newobject.isVerifiednewobject.isVerifiednewobject.isVerified' ,userUpdateForm.isVerified)
  };
  console.log('selectIndexselectIndexselectIndexselectIndex' , userUpdateForm);

  const valueChange  = (e) => {
      const {name , value } = e.target;
      setUserUpdateForm({...userUpdateForm , [name] : value})
  }
  // 

  // handle submit
const handleFormSubmit =  (e) => {
   e.preventDefault();
   console.log('userUpdateForm.isVerified userUpdateForm.isVerified ' ,userUpdateForm.isVerified)
   console.log('isActiveValueisActiveValueisActiveValue' ,isActiveValue)
   userUpdateForm.isVerified =isActiveValue;
   const url = `/api/admin-user-crud/${dataIndex.id}`
  //  console.log('urlurlurl' ,url)
  const response =  instance.patch(url ,userUpdateForm)
  console.log('responseresponseresponse1' ,response)
}

  const renderSaveButton =() => {
    return (
      <button type="button" onClick={e => handleFormSubmit(e)}>
      Save
    </button>
    )
  }
  // const patch response

   

  return (
    <>
      <SimpleHeader name="Users" parentName="Users" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Users table</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                  <th scope="col" />
                    <th className="sort" data-sort="name" scope="col">
                      Name
                    </th>
                    <th className="sort" data-sort="Email" scope="col">
                      Email
                    </th>
                    <th className="sort" data-sort="Verified" scope="col">
                      Verified
                    </th>
                    <th className="sort" data-sort="Active" scope="col">
                      Active
                    </th>
                    <th className="sort" data-sort="Token" scope="col">
                      Token
                    </th>
                    <th className="sort" data-sort="Created Date" scope="col">
                      Created Date
                    </th>
                    <th className="sort" data-sort="Updated Date" scope="col">
                      Updated Date
                    </th>
                    

                  </tr>
                </thead>
                <tbody className="list">
                  {(users.length) && users?.map((users, index) => (

                    <tr key={index}>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            color=""
                            role="button"
                            size="sm"
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => handleEditClick(e ,index)}
                            >
                              Edit
                              {editData.id === index.id && renderSaveButton()}
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Change Password
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/bootstrap.png")}
                            />
                          </a>
                          <Media>
                            <span className="name mb-0 text-sm">
                              <div className={`${dataIndex.id === users.id ? 'userFeildActive' : ''}`}>
                                    {users.firstName + " " + users.lastName}
                              </div>
                              {
                              (dataIndex &&  dataIndex.id === users.id) && 
                              <>
                                  <input 
                                    type="text"
                                    value={userUpdateForm.firstName}
                                    name = "firstName"
                                    onChange={e => valueChange(e)} 
                                  />
                                  <input 
                                    type="text"
                                    value={userUpdateForm.lastName}
                                    name = "lastName"
                                    onChange={e => valueChange(e)} 
                                  />
                                  </>
                                }
                            </span>

                            
                          </Media>
                        </Media>
                      </th>
                      <td className="budget">
                        <div className={`${dataIndex.id === users.id ? 'userFeildActive' : ''}`}>
                          {users.email}
                          </div>
                          {
                          (dataIndex &&  dataIndex.id === users.id) && 
                            <input 
                              type="text"
                              value={userUpdateForm.email}
                              name = "email"
                              onChange={e => valueChange(e)} 
                            />
                          }
                      </td>
                      <td>
                        <Badge color={users.isVerified ? 'success' : 'warning'} className="badge-dot mr-4">
                          <i className={users.isVerified ? 'bg-success' : 'bg-warning'} />
                          <div className={`${dataIndex.id === users.id ? 'userFeildActive' : ''}`}>
                              <span className="status">{users.isVerified ? 'true' : 'false'}</span>
                          </div>
                          { (dataIndex &&  dataIndex.id === users.id) && 
                            <select 
                              onChange={e => selectHandleChange(e)}
                              value={isActiveValue}
                            >
                              <option value=''></option>
                              <option value={true}>true</option>
                              <option value={false}>false</option>
                            </select>
                          }
                        </Badge>
                      </td>
                      <td>
                        <Badge color={users.isActive ? 'success' : 'warning'} className="badge-dot mr-4">
                          <i className={users.isActive ? 'bg-success' : 'bg-warning'} />
                          <span className="status">{users.isActive ? 'true' : 'false'}</span>
                        </Badge>
                      </td>
                      <td>

                        <span className="completion mr-2">{users.token}</span>

                      </td>
                      <td>
                        <div>
                          <span className="completion mr-3">{new Date(users.created_at).toLocaleDateString('en-GB').split('/').reverse().join('-')}</span>
                        </div>
                        <div>
                          <span className="completion mr-4">{new Date(users.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span className="completion mr-5">{new Date(users.updated_at).toLocaleDateString('en-GB').split('/').reverse().join('-')}</span>
                        </div>
                        <div>
                          <span className="completion mr-6">{new Date(users.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        
      </Container>
    </>
  );
}

export default Users;
