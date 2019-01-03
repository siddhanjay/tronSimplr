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
const myToken = utils.contract;

class Jumbotrons extends Component {
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
  fundContract() {
    var fundAmount = parseInt(document.getElementById('fundAmount').value);
    const result = myToken.send("fundContract", [], {amount : fundAmount/100000000});
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
        <Col xs="12" >
            <Card>
              <CardHeader>
                <strong>Fund Contract</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" className="form-horizontal">
                <FormGroup row>
                <Col md="12">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <Input type="text" id="fundAmount" name="input3-group1" placeholder="Amount" />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>Qtum tokens</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      </Col>
                  </FormGroup>
                 </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="md" color="success" onClick = {() => this.fundContract()}><i className="fa fa-dot-circle-o"></i> Pay </Button>
              </CardFooter>
            </Card>
            </Col>
      </div>
    );
  }
}

export default Jumbotrons;
