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
            count: 10,
            delay: 2,
            initialDelay: 5,
            sounds: ['one','two','three','four','five','six'],
            running: false,
        };

        this.createSoundLoop = this.createSoundLoop.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.one = React.createRef();
        this.two = React.createRef();
        this.three = React.createRef();
        this.four = React.createRef();
        this.five = React.createRef();
        this.six = React.createRef();

        // document.addEventListener('touchstart', function () {
            
        // });
    }

    

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createSoundLoop(event) {
        // if(this.state.running) {
        //     console.log('running');
        //     return;
        // }
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
        
        console.log('State: ', this.state);
        event.preventDefault();
        const computedCount = parseInt(this.state.count);
        let soundArray = []
        for (var i=0; i < computedCount; i++) {
            soundArray.push(this.state.sounds[Math.floor(Math.random()*this.state.sounds.length)]);
        }
        console.log(soundArray);

        setTimeout(()=>{
            soundArray.forEach((soundRef, i) => {
                setTimeout(()=>{ 
                    console.log(soundRef);
                    this[soundRef].current.play()},
                i * parseInt(this.state.delay) * 1000);
            });
        }, parseInt(this.state.initialDelay) * 1000);

        this.setState({isRunning: false});
    }   

    render() {
        return (
            <div>
                <div>
                    <audio ref={this.one} id="one" src={one} controls/>
                    <audio ref={this.two} id="two" src={two} controls/>
                    <audio ref={this.three} id="three" src={three} controls/>
                    <audio ref={this.four} id="four" src={four} controls/>
                    <audio ref={this.five} id="five" src={five} controls/>
                    <audio ref={this.six} id="six" src={six} controls/>
                </div>
                <form onSubmit={this.createSoundLoop}>
                    <h4>Create loop</h4>
                    <label>Initial Delay: 
                        <input name="initialDelay" type="number" value={this.state.initialDelay} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>Count: 
                        <input name="count" type="number" value={this.state.count} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>Delay: 
                        <input name="delay" type="number" value={this.state.delay} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
           
        );
    }
}

