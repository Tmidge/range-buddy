import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import one from '../assets/1.wav';
import two from '../assets/2.wav';
import three from '../assets/3.wav';
import four from '../assets/4.wav';
import five from '../assets/5.wav';
import six from '../assets/6.wav';

export default class LoopForm extends React.Component {
    constructor() {
        super();

        this.state = {
            count: 10,
            delay: 4,
            initialDelay: 5,
            sounds: ['one','two','three','four','five','six'],
            randomDelayMin: 0,
            randomDelayMax: 0,
            random: null,
            soundArray: [],
            isRunning: false,
        };

        this.createSoundLoop = this.createSoundLoop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleUpButtonClick = this.handleUpButtonClick.bind(this);
        this.handleDownButtonClick = this.handleDownButtonClick.bind(this);


        this.one = React.createRef();
        this.two = React.createRef();
        this.three = React.createRef();
        this.four = React.createRef();
        this.five = React.createRef();
        this.six = React.createRef();
    }

    

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleCheckboxChange(event) {
        this.setState({ random: event.target.random });
    }

    // delay(){
    //     if(this.state.delay > 0) {
    //         return parseInt(this.state.delay);
    //     }
    //     const min = Math.ceil(parseInt(this.state.randomDelayMin));
    //     const max = Math.floor(parseInt(this.state.randomDelayMax));
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    createSoundLoop(event) {
        event.preventDefault();
        if(this.state.isRunning === true) {
            return;
        }
        this.one.current.play();
        this.one.current.pause();

        this.two.current.play();
        this.two.current.pause();

        this.three.current.play();
        this.three.current.pause();

        this.four.current.play();
        this.four.current.pause();

        this.five.current.play();
        this.five.current.pause();

        this.six.current.play();
        this.six.current.pause();

        this.setState({isRunning: true}, this.runLoop(event));
    } 
    
    handleUpButtonClick(event) {
        event.preventDefault();
        console.log(event.target);
        this.setState({[event.target.name]: this.state[event.target.name] + 1});
    }

    handleDownButtonClick(event) {
        event.preventDefault();
        console.log(event.target);
        this.setState({[event.target.name]: this.state[event.target.name] - 1});
    }

    runLoop() {
        const computedCount = parseInt(this.state.count);
        let soundArray = [];
        for (var i=0; i < computedCount; i++) {
            soundArray.push(this.state.sounds[Math.floor(Math.random()*this.state.sounds.length)]);
        }

        this.setState({soundArray});

        setTimeout(()=>{
            soundArray.forEach((soundRef, i) => {
                setTimeout(()=>{ 
                    this[soundRef].current.play();
                    if(i === (soundArray.length -1)) {
                        this.setState({isRunning: false});
                    }
                },
                i * this.state.delay * 1000);
            });
        }, parseInt(this.state.initialDelay) * 1000);
    }

    render() {
        return (
            <div>
                <div>
                    <audio ref={this.one} id="one" src={one}/>
                    <audio ref={this.two} id="two" src={two}/>
                    <audio ref={this.three} id="three" src={three}/>
                    <audio ref={this.four} id="four" src={four}/>
                    <audio ref={this.five} id="five" src={five}/>
                    <audio ref={this.six} id="six" src={six}/>
                </div>
                <Form onSubmit={this.createSoundLoop}>
                    <Row>
                        <Col className="down-buttons">
                            <Row>
                                <Button size="lg" name="initialDelay" variant="dark" onClick={this.handleDownButtonClick}>
                                    -
                                </Button>
                            </Row>
                            <Row>
                                <Button size="lg" name="count" variant="dark" onClick={this.handleDownButtonClick}>
                                    -
                                </Button>
                            </Row>
                            <Row>
                                <Button size="lg" name="delay" variant="dark" onClick={this.handleDownButtonClick}>
                                    -
                                </Button>
                            </Row>
                        </Col>
                        <Col xs={8}>
                            <Form.Label>Initial Delay: </Form.Label>
                            <Form.Control size="lg" name="initialDelay" type="text" value={this.state.initialDelay} onChange={this.handleChange}/>

                            <Form.Label >Count: </Form.Label>
                            <Form.Control size="lg" name="count" type="text" value={this.state.count} onChange={this.handleChange}/>

                            <Form.Label >Delay: </Form.Label>
                            <Form.Control size="lg" name="delay" type="text" value={this.state.delay} onChange={this.handleChange}/>

                            <Button variant="dark" size="lg" type="submit" value="Submit">
                                GO!
                            </Button>
                        </Col>
                        <Col className="up-buttons">
                            <Row>
                                <Button size="lg" name="initialDelay" variant="dark" onClick={this.handleUpButtonClick}>
                                    +
                                </Button>
                            </Row>
                            <Row>
                                <Button size="lg" name="count" variant="dark" onClick={this.handleUpButtonClick}>
                                    +
                                </Button>
                            </Row>
                            <Row>
                                <Button size="lg" name="delay" variant="dark" onClick={this.handleUpButtonClick}>
                                    +
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                   
                        {(() => {
                           if(this.state.isRunning) {
                               return  <Row>
                                            <Col>
                                            </Col>
                                            <Col xs={8}>
                                                <Form.Label className="Running-text">RUNNING</Form.Label>
                                            </Col>
                                            <Col>
                                            </Col>
                                        </Row>
                           }
                        }
                        )()}
                </Form>

                {/* <form onSubmit={this.createSoundLoop}>
                    <h4>Create loop</h4>
                    <div>
                        <label>Initial Delay: 
                            <input sm={12} name="initialDelay" type="number" value={this.state.initialDelay} onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div>
                        <label>Count: 
                            <input name="count" type="number" value={this.state.count} onChange={this.handleChange}/>
                        </label>
                    </div>
                    <div>
                        <label>Delay: 
                            <input name="delay" type="number" value={this.state.delay} onChange={this.handleChange}/>
                        </label>
                    </div>
                    <label>Random Delay min: 
                        <input name="randomDelayMin" type="number" value={this.state.randomDelayMin} onChange={this.handleChange}/>
                    </label>
                    <label>Random Delay max: 
                        <input name="randomDelayMax" type="number" value={this.state.randomDelayMax} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <Button  variant="primary" size="lg" type="submit" value="Submit">
                        GO!
                    </Button>
                    <div>
                        {this.state.soundArray.toString()}
                        <ul>
                        {this.state.soundArray.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                        </ul>
                    </div>
                </form> */}
            </div>
           
        );
    }
}

