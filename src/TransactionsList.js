import React, { Component, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ReactDOM from 'react-dom'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';


class TransactionsList extends Component {
    constructor(props) {
        super(props)
        this.setForm = this.setForm.bind(this);
        this.showForm = false;
    }
    state = {

        dateTransaction: "",
        items: [],
        form: "",
        isOpen: false,
        itemNum: ""
      };
      

    componentDidMount(){

    }

    
    openModal(index) {
        this.setState({ isOpen: true, itemNum : JSON.stringify(index) })
        console.log(this.state.items);
        console.log(JSON.stringify(index));
        console.log(this.state.itemNum);
        console.log(this.state.items[this.state.itemNum]);
    };
    closeModal = () => this.setState({ isOpen: false, itemNum : "" });


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
                    if(data === 0){
                        alert("Aucune donnée trouvée.");
                    }

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


      ThToRender = () => () => {
        switch (this.state.form) {
            case "1":
                console.log('1');
                return (<thead>
                    <tr>
                        <th scope="col">PAN</th>
                        <th scope="col">Date</th>
                        <th scope="col">Montant</th>
                        <th scope="col">CodeMCC</th>
                        <th scope="col">Carte ID</th>
                        <th scope="col">Détails</th>
                    </tr>
                </thead>)
                
            case "2":
                console.log('2')
                return (<thead>
                    <tr>
                        <th scope="col">PAN</th>
                        <th scope="col">Date</th>
                        <th scope="col">Montant</th>
                        <th scope="col">CodeMCC</th>
                        <th scope="col">Carte ID</th>
                        <th scope="col">Détails</th>
                    </tr>
                </thead>)

            case "3":
                console.log('3');
                return (<thead>
                    <tr>
                        <th scope="col">PAN</th>
                        <th scope="col">Date</th>
                        <th scope="col">Montant</th>
                        <th scope="col">CodeMCC</th>
                        <th scope="col">Carte ID</th>
                        <th scope="col">Détails</th>
                    </tr>
                </thead>)

            case "4":
                console.log('4');
                return ( <thead>
                    <tr>
                        <th scope="col">PAN</th>
                        <th scope="col">date</th>
                        <th scope="col">Heure</th>
                        <th scope="col">Montant</th>
                        <th scope="col">Carte ID</th>
                        <th scope="col">Marchand</th>
                        <th scope="col">Numéro autorisation</th>
                        <th scope="col">BeneficiaryServiceRef</th>
        
                    </tr>
                </thead>)
            default:
                return (<thead>
                <tr>
                    
                </tr>
            </thead>)
        }
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
        this.setState({ form: i,
        items: [] })    
        console.log(i);
    }

    render() {
        const FormRender = this.FormToRender();
        const ThRender = this.ThToRender(); 
        //Table item creation
        let thToRender;
        if(this.state.from <4){
            thToRender = <thead>
                <tr>
                    <th scope="col">PAN</th>
                    <th scope="col">Date</th>
                    <th scope="col">Montant</th>
                    <th scope="col">CodeMCC</th>
                    <th scope="col">Carte ID</th>
                    <th scope="col">Détails</th>
                </tr>
            </thead>
        }
        else if(this.state.form === ""){
            thToRender = <thead>
 
            </thead>
        }
        else{
            thToRender = <thead>
            <tr>
                <th scope="col">PAN</th>
                <th scope="col">date</th>
                <th scope="col">Heure</th>
                <th scope="col">Montant</th>
                <th scope="col">Carte ID</th>
                <th scope="col">Marchand</th>
                <th scope="col">Numéro autorisation</th>
                <th scope="col">BeneficiaryServiceRef</th>

            </tr>
        </thead>
        }

        let tableToRender;
        if (this.state.items) {
            tableToRender = this.state.items.map((item, index) => {
                console.log("INDEX "+index)
                if(this.state.form <4){
                  return <tbody key={index}>
                    <tr>
                        <td>{item.pan}</td>
                        <td>{item.dateTransaction}</td>
                        <td>{item.transactionAmount}</td>
                        <td>{item.codeMCC}</td>
                        <td>{item.cardId}</td>
                        <td>
                        <Button  variant="outline-warning" onClick={() => this.openModal(index)}>
                            Détails
                        </Button>                        
                        </td>
                    </tr>
                  </tbody>

                }
                else{
                  return <tbody key={index}>
                        <tr>
                            <td>{item.pan}</td>
                            <td>{item.dateTransaction}</td>
                            <td>{item.heureTransaction}</td>
                            <td>{item.transactionAmount}</td>
                            <td>{item.cardId}</td>
                            <td>{item.nomMarchand}</td>
                            <td>{item.numAut}</td>
                            <td>{item.beneficiaryServiceRef}</td>
                        </tr>
                    </tbody>
                }
            });
          }


        //Modal to render
        let modalToRender;
        if(this.state.itemNum != ""){
            return <Modal
            show={this.state.isOpen} onHide={this.closeModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card border="warning" className="text-center" >
                <Card.Header >{this.state.items[this.state.itemNum].distributorRef}</Card.Header>
                    <Card.Body> 
                            <Card.Title>CardId : {this.state.items[this.state.itemNum].cardId}</Card.Title>
                            <Card.Text >Pan : {this.state.items[this.state.itemNum].pan}</Card.Text>
                            <Card.Text >BeneficiaryServiceRef : {this.state.items[this.state.itemNum].beneficiaryServiceRef}</Card.Text>
            
                            <Card.Text >FunderContractRef : {this.state.items[this.state.itemNum].funderContractRef}</Card.Text>
                            <Card.Text >IdOperation : {this.state.items[this.state.itemNum].idOperation}</Card.Text>
                            <Card.Text >TransactionType : {this.state.items[this.state.itemNum].transactionType}</Card.Text>
                            <Card.Text >TechnicalStatus : {this.state.items[this.state.itemNum].technicalStatus}</Card.Text>
                            <Card.Text >ReversalFlag : {this.state.items[this.state.itemNum].reversalFlag}</Card.Text>
                            <Card.Text >CanalAcceptationValue : {this.state.items[this.state.itemNum].canalAcceptationValue}</Card.Text>
                            <Card.Text >PosEntryMode : {this.state.items[this.state.itemNum].posEntryMode}</Card.Text>
                            <Card.Text >CardStatus : {this.state.items[this.state.itemNum].cardStatus}</Card.Text>
            
                            <Card.Text >TransactionAmount : {this.state.items[this.state.itemNum].transactionAmount}</Card.Text>
            
                            <Card.Text >Exponent : {this.state.items[this.state.itemNum].exponent}</Card.Text>
                            
                            <Card.Text >NumAut : {this.state.items[this.state.itemNum].numAut}</Card.Text>
                            
                            <Card.Text >ClearingStatus : {this.state.items[this.state.itemNum].clearingStatus}</Card.Text>
                            <Card.Text >UnknowPAN : {this.state.items[this.state.itemNum].unknowPAN}</Card.Text>
                            <Card.Text >AcquirerReferenceNumber : {this.state.items[this.state.itemNum].acquirerReferenceNumber}</Card.Text>
                            <Card.Text >IdMarchand :{this.state.items[this.state.itemNum].idMarchand}</Card.Text>
                        
                            <Card.Text >NomMarchand : {this.state.items[this.state.itemNum].nomMarchand}</Card.Text>
                            
                            <Card.Text >CountryCode : {this.state.items[this.state.itemNum].countryCode}</Card.Text>
                            <Card.Text >IdTerminal : {this.state.items[this.state.itemNum].idTerminal}</Card.Text>
                            <Card.Text >IdAcceptation : {this.state.items[this.state.itemNum].idAcceptation}</Card.Text>
                            <Card.Text >CodeMCC : {this.state.items[this.state.itemNum].codeMCC}</Card.Text>
                        </Card.Body>
                        <Card.Footer  className="text-muted">{this.state.items[this.state.itemNum].dateTransaction}</Card.Footer>
                </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button  variant="warning"  onClick={this.closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        }



        //Card item creation
        let itemsToRender;
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
                        
                    <table className="table table-sm table-dark table-striped">
                        <ThRender></ThRender>
                        {tableToRender}
                    </table>

                {/* 
                        <Row>
                        {
                        itemsToRender
                        } 
                        </Row>
        */}
                    </pre>

                </div>
                
                
            </div>

        )
    }
}

export default TransactionsList