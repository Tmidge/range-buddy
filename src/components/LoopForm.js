import React from "react";
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
            count: 0,
            delay: 0,
            sounds: ['one','two','three','four','five','six'],
        };

        this.createSoundLoop = this.createSoundLoop.bind(this);
        this.handleChange = this.handleChange.bind(this);

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

    createSoundLoop(event) {
        console.log('State: ', this.state);
        event.preventDefault();
        const computedCount = parseInt(this.state.count);
        let soundArray = []
        for (var i=0; i < computedCount; i++) {
            soundArray.push(this.state.sounds[Math.floor(Math.random()*this.state.sounds.length)]);
        }
        console.log(soundArray);
        soundArray.forEach((soundRef, i) => {
            setTimeout(()=>{ 
                console.log(soundRef);
                this[soundRef].current.play()},
            i * parseInt(this.state.delay));
        })
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
                <form onSubmit={this.createSoundLoop}>
                    <h4>Create loop</h4>
                    <label>Count: 
                        <input name="count" type="number" value={this.state.count} onChange={this.handleChange}/>
                    </label>
                    <label>Delay: 
                        <input name="delay" type="number" value={this.state.delay} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
           
        );
    }
}

