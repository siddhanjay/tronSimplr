import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Alert,
} from 'reactstrap';

import utils from '../../../utils/index';

var contract ;

class Carousels extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      visible: false,
      color: "success",
      message: "Transaction created successfully"
    };
    this.getContract();
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  onDismiss() {
    this.setState({ visible: false });
   
  }

  getContract(){
    if(this.contract === undefined){
      const result =  tronWeb.contract().at("TGedNeSvFy6TSmVMPNp5fD55xbyW2SdDBJ");
      var promise = Promise.resolve(result);
      var self_ = this;
      try {
        promise.then(function(value) {
           console.log(value);
          self_.contract = value;
           return value;
         })
       } catch(e){
         console.log(e);
        }
    }
}

  addUser() {
    var userName = document.getElementById('addUserName').value;
    var userAddress = document.getElementById('addUserAddress').value;
    const result = this.contract.addUser(userName, userAddress).send();
    var promise = Promise.resolve(result);
    this.setState({ visible: true });
    this.setState({ color : "warning"});
    this.setState({ message: "Transcation is pending approval.Please verify" });
    var self_ = this;
    try {
      promise.then(function(value) {
         self_.setState({ color : "success"});
         self_.setState({ message: "Transaction created successfully" });
       })
     } catch(e){
       self_.setState({color: "danger"})
       self_.setState({ message: e });
      }
  }
  
  render() {
    
    return (
      <div className="animated fadeIn">
      <Alert color={this.state.color} id="successToastr"  isOpen={this.state.visible} toggle={this.onDismiss}>
                  {this.state.message}
        </Alert>
        <Row>
          <Col xs="12" >
          <Card>
              <CardHeader>
                Add User to Group
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="addUserName" name="username1" placeholder="Justin Sun" autoComplete="name"/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="addUserAddress" name="email1" placeholder="TT5KEUr43WpWw1Tn8xYzGhioUqBf5pwDDt" autoComplete="username"/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button type="submit" size="md" color="success" onClick = {() => this.addUser()}>Add User</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      </div>
    );
  }
}

export default Carousels;