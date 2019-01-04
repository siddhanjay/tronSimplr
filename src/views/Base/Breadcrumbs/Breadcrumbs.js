import React, { Component } from 'react';
import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Alert,
} from 'reactstrap';
import utils from '../../../utils';


const myToken = utils.contract;

var contract ;
class Breadcrumbs extends Component {

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



 
  createContract() {
    var gName = document.getElementById('exampleInputName2').value;
    var userName = document.getElementById('exampleInputEmail2').value;
    const result =  this.contract.createContract(gName,userName).send();
   var promise = Promise.resolve(result);
   this.setState({ visible: true });
   this.setState({ color : "warning"});
   this.setState({ message: "Transaction is pending approval.Please verify" });
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
          <Col xs="12">
          <Card>
              <CardHeader>
                Create New Group
              </CardHeader>
              <CardBody>
                <Form action="" method="post" inline>
                  <FormGroup className="pr-1">
                    <Label htmlFor="exampleInputName2" className="pr-1">Group Name</Label>
                    <Input type="text" id="exampleInputName2" placeholder="Trip to Bali" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    <Label htmlFor="exampleInputEmail2" className="pr-1"> Your Name</Label>
                    <Input type="text" id="exampleInputEmail2" placeholder="Nakamoto" required />
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="md" color="primary" onClick = {() => this.createContract()}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="md" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Breadcrumbs;
