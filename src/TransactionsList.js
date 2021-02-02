import React, { Component, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ReactDOM from 'react-dom'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';



class TransactionsList extends Component {
    constructor(props) {
        super(props)
        this.setForm = this.setForm.bind(this);
        this.showForm = false;
    }
    state = {

        dateTransaction: "",
        items: [],
        form: ""

      };
      

    componentDidMount(){

    }

    LoadingButton = () => () => {
        const [isLoading, setLoading] = useState(false);
        console.log(this.showForm);
        useEffect(() => {
            var targetUrl;
            let isMounted = true; // note this flag denote mount status

            if (isLoading) {
                this.showForm = true;
                switch (this.state.form) {
                    case "1":
                        targetUrl = 'https://somusapp.azurewebsites.net/api/v1/settlement/distributorRef='+ReactDOM.findDOMNode(this.distrib).value+'/cardId='+ReactDOM.findDOMNode(this.id).value
                        break;
                    case "2":   
                        targetUrl = 'https://somusapp.azurewebsites.net/api/v1/settlement/distributorRef='+ReactDOM.findDOMNode(this.distrib).value+'/cardId='+ReactDOM.findDOMNode(this.id).value+"/dateTransaction="+ReactDOM.findDOMNode(this.date).value
                        break;                    
                    case "3":  
                        targetUrl = 'https://somusapp.azurewebsites.net/api/v1/settlement/distributorRef='+ReactDOM.findDOMNode(this.distrib).value+'/idOperation='+ReactDOM.findDOMNode(this.id).value          
                        break;                    
                    case "4":
                        targetUrl = 'https://somusapp.azurewebsites.net/api/v1/wrongdebit/distributorRef='+ReactDOM.findDOMNode(this.distrib).value+'/cardId='+ReactDOM.findDOMNode(this.id).value
                        break;
                    default:
                        break;
                }

            fetch( targetUrl)
                .then(blob => blob.json())
                .then(data => {
                    console.table(data);
                    if (isMounted) {
                        this.setState({items: data})
                    }
                    console.log(this.state.items)
                    setLoading(false);

    
                    return data;
                })
                .catch(e => {
                    console.log(e);
                    return e;
                });
            }
            return () => { isMounted = false };
        }, [isLoading]);
      
        const handleClick = () => setLoading(true);
      
        return (
          <Button
            variant="light"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
          >
            {isLoading ? 'Recherche…' : 'Rechercher'}
          </Button>
        );
      }

      FormToRender = () => () => {
        const ButtonLoad = this.LoadingButton();
        this.showForm = true;
        console.log(this.showForm);

        switch (this.state.form) {
            case "1":
                console.log('1');
                return (
                    <div style={{paddingTop: "1em"}}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label style={{ color: "white", fontWeight: "bold"}}>Card ID</Form.Label>
                            <Form.Control ref={id => { this.id = id }} placeholder="0000000000000000" type="text"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                            <Form.Label style={{ color: "white", fontWeight: "bold"}}>Distributeur</Form.Label>
                            <Form.Control ref={distrib => { this.distrib = distrib }} as="select" defaultValue="UPCOHESIA" type="text">
                                <option>UPCOHESIA</option>
                                <option>UPHELLAS</option>
                            </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <ButtonLoad/>
                    </div>
                )
                
            case "2":
                console.log('2')
                return (<div style={{paddingTop: "1em"}}>
                    <Form.Row>
                    <Form.Group as={Col}>
                    <Form.Label style={{ color: "white", fontWeight: "bold"}}>Card ID</Form.Label>
                    <Form.Control ref={id => { this.id = id }} type="text" placeholder="0000000000000000"/>
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Form.Label style={{ color: "white", fontWeight: "bold"}}>Distributeur</Form.Label>
                    <Form.Control ref={distrib => { this.distrib = distrib }} as="select" defaultValue="UPCOHESIA" type="text">
                        <option>UPCOHESIA</option>
                        <option>UPHELLAS</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Form.Label style={{ color: "white", fontWeight: "bold"}}>Date</Form.Label>
                    <Form.Control ref={date => { this.date = date }} placeholder="AAAA-MM-JJ" type="text"/>
                    </Form.Group>
                </Form.Row>
                <ButtonLoad/>
                </div>)

            case "3":
                console.log('3');
                return (<div style={{paddingTop: "1em"}}><Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label style={{ color: "white", fontWeight: "bold"}}>ID opération</Form.Label>
                    <Form.Control ref={id => { this.id = id }} placeholder="0000000000000000" type="text"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label style={{ color: "white", fontWeight: "bold"}}>Distributeur</Form.Label>
                    <Form.Control ref={distrib => { this.distrib = distrib }} as="select" defaultValue="UPCOHESIA"  type="text">
                        <option>UPCOHESIA</option>
                        <option>UPHELLAS</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                <ButtonLoad/>
                </div>)

            case "4":
                console.log('4');
                return (<div style={{paddingTop: "1em"}}><Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label style={{ color: "white", fontWeight: "bold"}}>Card ID</Form.Label>
                    <Form.Control ref={id => { this.id = id }} placeholder="0000000000000000" type="text"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label style={{ color: "white", fontWeight: "bold"}}>Distributeur</Form.Label>
                    <Form.Control ref={distrib => { this.distrib = distrib }} as="select"  type="text" defaultValue="UPCOHESIA" >
                        <option>UPCOHESIA</option>
                        <option>UPHELLAS</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                <ButtonLoad/>
                </div>)
            default:
                return ("")
        }
      }
      
      
    setForm(i){
        this.setState({ form: i })    
        console.log(i);
    }

    render() {
        let itemsToRender;
        const FormRender = this.FormToRender();
        if (this.state.items) {
          itemsToRender = this.state.items.map((item, index) => {
              console.log(item.distributorRef);
              if(this.state.form <4){
                return <Col key={index} style={{paddingTop: "1em"}}><Card border="warning" className="text-center" >
                <Card.Header >{item.distributorRef}</Card.Header>
                <Card.Body> 
                    <Card.Title>CardId : {item.cardId}</Card.Title>
                    <Card.Text >Pan : {item.pan}</Card.Text>
                    <Card.Text >BeneficiaryServiceRef : {item.beneficiaryServiceRef}</Card.Text>
    
                    <Card.Text >FunderContractRef : {item.funderContractRef}</Card.Text>
                    <Card.Text >IdOperation : {item.idOperation}</Card.Text>
                    <Card.Text >TransactionType : {item.transactionType}</Card.Text>
                    <Card.Text >TechnicalStatus : {item.technicalStatus}</Card.Text>
                    <Card.Text >ReversalFlag : {item.reversalFlag}</Card.Text>
                    <Card.Text >CanalAcceptationValue : {item.canalAcceptationValue}</Card.Text>
                    <Card.Text >PosEntryMode : {item.posEntryMode}</Card.Text>
                    <Card.Text >CardStatus : {item.cardStatus}</Card.Text>
    
                    <Card.Text >TransactionAmount : {item.transactionAmount}</Card.Text>
    
                    <Card.Text >Exponent : {item.exponent}</Card.Text>
                    
                    <Card.Text >NumAut : {item.numAut}</Card.Text>
                    
                    <Card.Text >ClearingStatus : {item.clearingStatus}</Card.Text>
                    <Card.Text >UnknowPAN : {item.unknowPAN}</Card.Text>
                    <Card.Text >AcquirerReferenceNumber : {item.acquirerReferenceNumber}</Card.Text>
                    <Card.Text >IdMarchand :{item.idMarchand}</Card.Text>
                   
                    <Card.Text >NomMarchand : {item.nomMarchand}</Card.Text>
                    
                    <Card.Text >CountryCode : {item.countryCode}</Card.Text>
                    <Card.Text >IdTerminal : {item.idTerminal}</Card.Text>
                    <Card.Text >IdAcceptation : {item.idAcceptation}</Card.Text>
                    <Card.Text >CodeMCC : {item.codeMCC}</Card.Text>
                </Card.Body>
                <Card.Footer  className="text-muted">{item.dateTransaction}</Card.Footer>
            </Card></Col>;
              }
              else{
                return <Col key={index} style={{paddingTop: "1em"}}><Card className="text-center" >
                <Card.Header>{item.distributorRef}</Card.Header>
                <Card.Body> 
                    <Card.Title>CardId : {item.cardId}</Card.Title>
                    <Card.Text >Pan : {item.pan}</Card.Text>
                    <Card.Text >BeneficiaryServiceRef : {item.beneficiaryServiceRef}</Card.Text>
                    <Card.Text >TransactionAmount : {item.transactionAmount}</Card.Text>                 
                    <Card.Text >NumAut : {item.numAut}</Card.Text>
                    <Card.Text >NomMarchand : {item.nomMarchand}</Card.Text>
                    <Card.Text> HeureTransaction : {item.heureTransaction}</Card.Text>
                    
                </Card.Body>
                <Card.Footer  className="text-muted">{item.dateTransaction}</Card.Footer>
            </Card></Col>;
              }
          });
        }

        return (
            <div>
                <div className="container" style={{paddingTop: "3em"}}>

                    <Row className="align-items-center">
                        <Col>
                            <Button variant="light" ref={button1 => { this.button1 = button1 }}  onClick={(e) => this.setForm("1")}>Every transaction of card id</Button>
                        </Col>      
                        <Col>               
                            <Button variant="light" ref={button2 => { this.button2 = button2 }} onClick={(e) => this.setForm("2")}>Every transaction by date</Button>
                        </Col>
                        <Col>
                            <Button variant="light" ref={button3 => { this.button3 = button3 }}  onClick={(e) => this.setForm("3")}>Transaction by IDoperation</Button>
                        </Col>
                        <Col>
                            <Button variant="light" ref={button3 => { this.button3 = button3 }}  onClick={(e) => this.setForm("4")}>Every wrong debit of card id</Button>
                        </Col>
                    </Row>


                    <FormRender></FormRender>

                    <pre  style={{paddingTop: "3em"}}>
                        <Row>
                        {
                        itemsToRender
                        } 
                        </Row>
        
                    </pre>

                </div>
                
                
            </div>

        )
    }
}

export default TransactionsList