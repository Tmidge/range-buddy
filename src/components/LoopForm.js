import React from "react";
import wordsToNumbers from 'words-to-numbers';
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

//TODO can get in strage state after pressing play to quickly after stop.

export default class LoopForm extends React.Component {
    constructor() {
        super();

        this.state = {
            count: 10,
            delay: 1,
            initialDelay: 3,
            sounds: ['one','two','three','four','five','six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'],
            randomDelayMin: 0,
            randomDelayMax: 0,
            random: null,
            soundArray: [],
            delayArray: [],
            isRunning: false,
            targetCount: 6,
            submitted: false,
            current: null,
            last: null,
            next: null,
        };

        this.createSoundLoop = this.createSoundLoop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleUpButtonClick = this.handleUpButtonClick.bind(this);
        this.handleDownButtonClick = this.handleDownButtonClick.bind(this);
        this.stopLoop = this.stopLoop.bind(this);


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

        this.sounds = [
            this.one, 
            this.two, 
            this.three, 
            this.four, 
            this.five, 
            this.six, 
            this.seven, 
            this.eight, 
            this.nine, 
            this.ten, 
            this.eleven, 
            this.twelve
        ];


        this.tone = React.createRef();
        this.startTone = React.createRef();
    }

    stopLoop(event) {
        event.preventDefault();

        this.state.delayArray.forEach( delay => clearTimeout(delay));
        this.stopSounds();
        this.setState({last: null});
        this.setState({current: null});
        this.setState({next: null});
        this.setState({soundArray: []});
        this.setState({delayArray: []}, this.setState({isRunning: false}));
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleCheckboxChange(event) {
        this.setState({ random: event.target.random });
    }

    createSoundLoop(event) {
        event.preventDefault();
        this.setState({submitted: true});
        if(this.state.isRunning === true) {
            return;
        } else {
            this.setState({stop: false});
            this.setState({last: null});
            this.setState({current: null});
            this.setState({next: null});
        }

        this.setState({isRunning: true}, this.runLoop(event));
    } 
    
    handleUpButtonClick(event) {
        const targetMaximum = 12;
        let maximum = 100;
        let number;
        let increment = 1;

        event.preventDefault();

        if (event.target.name === 'targetCount') {
            maximum = targetMaximum;
        } else if (event.target.name === 'delay') {
            increment = 0.5;
        } 

        if (Number(this.state[event.target.name]) >= 0 && Number(this.state[event.target.name]) < maximum) {
            number = Number(this.state[event.target.name]) + increment;
        } else if (Number(this.state[event.target.name]) === maximum){
            number = maximum;
        } else {
            number = increment;
        }
        this.setState({[event.target.name]: number});
    }

    handleDownButtonClick(event) {
        event.preventDefault();
        let number;
        let minimum = 1;
        let increment = 1;

        if (event.target.name === 'delay') {
            minimum = 0.5;
            increment = 0.5;
        } 

        if (Number(this.state[event.target.name]) >= 0 && Number(this.state[event.target.name]) > minimum) {
            number = Number(this.state[event.target.name]) - increment;
        } else if (Number(this.state[event.target.name]) === minimum){
            number = minimum;
        } else {
            number = increment;
        }
        this.setState({[event.target.name]: number});
    }

    runLoop() {
        this.initSounds();
        this.setState({submitted: false});
        const computedCount = Number(this.state.count);
        let soundArray = [];
        const targets = this.state.sounds.slice(0,this.state.targetCount);
        for (var i=0; i < computedCount; i++) {
            soundArray.push(targets[Math.floor(Math.random()*targets.length)]);
        }
        this.setState({soundArray});

        setTimeout(()=>{
            let delayArray = [];
            soundArray.forEach((soundRef, i) => {
                const delay = (i * this.state.delay) * 1000;

                const soundDelay = setTimeout(()=>{ 
                    if(i === (soundArray.length -1)) {
                        this.setState({isRunning: false});
                        this.setState({delayArray: []});
                    }
                    this[soundRef].current.pause();
                    this[soundRef].current.currentTime = 0;

                    this.setState({last: soundArray[i-1]});
                    this.setState({current: soundRef});
                    this.setState({next: soundArray[i+1]});
                    this[soundRef].current.play();
                }, delay);

                delayArray.push(soundDelay);
                this.setState({delayArray});
            });
        }, Number(this.state.initialDelay) * 1000);
    }

    wordFormat(string) {
        if(string) {
            return wordsToNumbers(string);
        } else {
            return '-';
        }
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
                            {(() => {
                                if(this.state.isRunning) {
                                    return <Col className="target-info">
                                        <Row>
                                            <h3>
                                                Last
                                            </h3>
                                            <div className="target-number last">
                                                {this.wordFormat(this.state.last)}
                                            </div>
                                        </Row>
                                        <Row>
                                            <h1>
                                                Current
                                            </h1>
                                            <div className="target-number current">
                                                {this.wordFormat(this.state.current)}
                                            </div>
                                        </Row>
                                        <Row>
                                            <h4>
                                                Next
                                            </h4>
                                            <div className="target-number next">
                                                {this.wordFormat(this.state.next)}
                                            </div>
                                        </Row>
                                    </Col>
                                } else {
                                    return <Row>
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
                                            Delay between each call out in seconds.
                                        </Form.Text>
                                        <Form.Text className="text-muted">
                                            Delay lower than 1 may cause sounds to be cut off.
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
                                            Drop down to define range for call out numbers. Selecting 4 means the call outs will be choosen from the numbers 1-4.
                                        </Form.Text>
                                    </Row>
                                </Row>
                                }
                            })()}
                            <Row className="submit-row">
                                {(() => {
                                    if(this.state.isRunning) {
                                        return <Button disabled={this.state.submitted}
                                                    className="submit-button"
                                                    variant="dark"
                                                    size="lg" 
                                                    onClick={this.stopLoop}>
                                                        STOP
                                                </Button>
                                    } else {
                                        return <Button className="submit-button" variant="dark" size="lg" type="submit" value="Submit">
                                                    GO!
                                                </Button>
                                    }
                                })()}
                            </Row>
                        </Col>
                    </Row>
                    <Row className="top-level-row">
                        <div className="known-issues">
                            The app can get into a bad state if 'GO!' is pressed too quickly after 'STOP', refreshing should fix this.
                        </div>
                        <div className="app-description">
                            This app plays vocal call outs to be used when target shooting. Currently it only supports the numbers 1-12.
                        </div>
                    </Row>
                </Form>
            </div>
           
        );
    }

    initSounds() {
        this.sounds.forEach(sound => {
            sound.current.play();
            sound.current.pause();
        })

        this.startTone.current.play();
    }
}

