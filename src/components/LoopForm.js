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
import seven from '../assets/7.wav';
import eight from '../assets/8.wav';
import nine from '../assets/9.wav';
import ten from '../assets/10.wav';
import eleven from '../assets/11.wav';
import twelve from '../assets/12.wav';
import startTone from '../assets/HOLD.wav';
import tone from '../assets/Dtmf-4.wav';


export default class LoopForm extends React.Component {
    constructor() {
        super();

        this.state = {
            count: 10,
            delay: 4,
            initialDelay: 5,
            sounds: ['one','two','three','four','five','six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'],
            randomDelayMin: 0,
            randomDelayMax: 0,
            random: null,
            soundArray: [],
            isRunning: false,
            targetCount: 8,
        };

        this.createSoundLoop = this.createSoundLoop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleUpButtonClick = this.handleUpButtonClick.bind(this);
        this.handleDownButtonClick = this.handleDownButtonClick.bind(this);
        this.dropDownChange = this.dropDownChange.bind(this);


        this.one = React.createRef();
        this.two = React.createRef();
        this.three = React.createRef();
        this.four = React.createRef();
        this.five = React.createRef();
        this.six = React.createRef();
        this.seven = React.createRef();
        this.eight = React.createRef();
        this.nine = React.createRef();
        this.ten = React.createRef();
        this.eleven = React.createRef();
        this.twelve = React.createRef();


        this.tone = React.createRef();
        this.startTone = React.createRef();
    }

    dropDownChange(event) {
        console.log(event.target);
    }

    handleChange(event) {
        console.log('event: ', event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    handleCheckboxChange(event) {
        this.setState({ random: event.target.random });
    }

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

        this.seven.current.play();
        this.seven.current.pause();

        this.eight.current.play();
        this.eight.current.pause();

        this.nine.current.play();
        this.nine.current.pause();

        this.ten.current.play();
        this.ten.current.pause();

        this.eleven.current.play();
        this.eleven.current.pause();

        this.twelve.current.play();
        this.twelve.current.pause();

        this.startTone.current.play();

        this.setState({isRunning: true}, this.runLoop(event));
    } 
    
    handleUpButtonClick(event) {
        console.log('event: ', event.target);
        const targetMaximum = 12;
        let maximum = 100;
        let number;
        event.preventDefault();
        if (event.target.name === 'targetCount') {
            maximum = targetMaximum;
        }
        if (parseInt(this.state[event.target.name]) >= 0 && parseInt(this.state[event.target.name]) < maximum) {
            number = parseInt(this.state[event.target.name]) + 1;
            //TODO this isnt working right
        } else if (parseInt(event.target.value) === maximum){
            number = maximum;
        } else {
            number = 1;
        }
        // const number = parseInt(this.state[event.target.name]) >= 0 ? parseInt(this.state[event.target.name]) + 1 : 1;
        this.setState({[event.target.name]: number});
    }

    handleDownButtonClick(event) {
        event.preventDefault();
        // const number = parseInt(this.state[event.target.name]) > 0 ? parseInt(this.state[event.target.name]) - 1 : 0;
        let number;
        let minimum = 0;
        const targetMinimum = 1;
        if (event.target.name === 'targetCount') {
            minimum = targetMinimum;
        }
        if (parseInt(this.state[event.target.name]) >= 0 && parseInt(this.state[event.target.name]) > minimum) {
            number = parseInt(this.state[event.target.name]) - 1;
        } else if (parseInt(this.state[event.target.value]) === minimum){
            number = minimum;
        } else {
            number = 1;
        }
        this.setState({[event.target.name]: number});
    }

    runLoop() {
        const computedCount = parseInt(this.state.count);
        let soundArray = [];
        const targets = this.state.sounds.slice(0,this.state.targetCount);
        for (var i=0; i < computedCount; i++) {
            soundArray.push(targets[Math.floor(Math.random()*targets.length)]);
        }
        console.log(soundArray);
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
                    <audio ref={this.seven} id="seven" src={seven}/>
                    <audio ref={this.eight} id="eight" src={eight}/>
                    <audio ref={this.nine} id="nine" src={nine}/>
                    <audio ref={this.ten} id="ten" src={ten}/>
                    <audio ref={this.eleven} id="eleven" src={eleven}/>
                    <audio ref={this.twelve} id="twelve" src={twelve}/>


                    <audio ref={this.startTone} id="startTone" src={startTone}/>
                    <audio ref={this.tone} id="tone" src={tone}/>

                </div>
                <Form onSubmit={this.createSoundLoop}>
                    <Row className="top-level-row">
                        <Col xs={12}>
                            <Row>
                                <Col className="button-col">
                                    <Button size="lg" name="initialDelay" variant="dark" onClick={this.handleDownButtonClick}>
                                        -
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label>Initial Delay: </Form.Label>
                                    <Form.Control size="lg" name="initialDelay" type="text" value={this.state.initialDelay} onChange={this.handleChange}/>
                                </Col>
                                <Col className="button-col button-right">
                                    <Button size="lg" name="initialDelay" variant="dark" onClick={this.handleUpButtonClick}>
                                        +
                                    </Button>
                                </Col>
                                <Form.Text className="text-muted">
                                    One time Pause before first call out.
                                </Form.Text>
                            </Row>
                            <Row>
                                <Col className="button-col">
                                    <Button size="lg" name="count" variant="dark" onClick={this.handleDownButtonClick}>
                                        -
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label >Count: </Form.Label>
                                    <Form.Control size="lg" name="count" type="text" value={this.state.count} onChange={this.handleChange}/>
                                </Col>
                                <Col className="button-col button-right">
                                    <Button size="lg" name="count" variant="dark" onClick={this.handleUpButtonClick}>
                                        +
                                    </Button>
                                </Col>
                                <Form.Text className="text-muted">
                                    Number of call outs.
                                </Form.Text>
                            </Row>
                            <Row>
                                <Col className="button-col">
                                    <Button size="lg" name="delay" variant="dark" onClick={this.handleDownButtonClick}>
                                        -
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label >Delay: </Form.Label>
                                    <Form.Control size="lg" name="delay" type="text" value={this.state.delay} onChange={this.handleChange}/>
                                    
                                </Col>
                                <Col className="button-col button-right">
                                    <Button size="lg" name="delay" variant="dark" onClick={this.handleUpButtonClick}>
                                        +
                                    </Button>
                                </Col>
                                <Form.Text className="text-muted">
                                    Delay between each call out.
                                </Form.Text>
                            </Row>
                            <Row>
                                <Col className="button-col">
                                    <Button size="lg" name="targetCount" variant="dark" onClick={this.handleDownButtonClick}>
                                        -
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label >Targets: </Form.Label>
                                    <Form.Control as="select" size="lg" name="targetCount" value={this.state.targetCount} onChange={this.handleChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                    </Form.Control>
                                </Col>
                                <Col className="button-col button-right">
                                    <Button size="lg" name="targetCount" variant="dark" onClick={this.handleUpButtonClick}>
                                        +
                                    </Button>
                                </Col>
                                <Form.Text className="text-muted">
                                    Drop down with number of targets
                                </Form.Text>
                            </Row>
                            
                            <Row className="submit-row">
                                <Button className="submit-button" variant="dark" size="lg" type="submit" value="Submit">
                                    GO!
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                    {(() => {
                        if(this.state.isRunning) {
                            return  <Row className="top-level-row">
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
                    <Row className="top-level-row">
                        <div className="app-description">
                            This app plays vocal call outs to be used when target shooting. Currently it only supports the numbers 1-12. It is in development and features are added frequently.
                        </div>
                    </Row>
                </Form>
            </div>
           
        );
    }
}

