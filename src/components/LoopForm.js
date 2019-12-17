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
            delay: 0,
            initialDelay: 5,
            sounds: ['one','two','three','four','five','six'],
            randomDelayMin: 0,
            randomDelayMax: 0,
            random: null,
            soundArray: [],
        };

        this.createSoundLoop = this.createSoundLoop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

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
        let soundArray = [];
        for (var i=0; i < computedCount; i++) {
            soundArray.push(this.state.sounds[Math.floor(Math.random()*this.state.sounds.length)]);
        }

        this.setState({soundArray});

        setTimeout(()=>{
            soundArray.forEach((soundRef, i) => {
                // const delay = this.delay();
                setTimeout(()=>{ 
                    // console.log(delay);
                    this[soundRef].current.play()},
                i * this.state.delay * 1000);
            });
        }, parseInt(this.state.initialDelay) * 1000);

        // this.setState({isRunning: false});
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
                    {/* <label>Random Delay min: 
                        <input name="randomDelayMin" type="number" value={this.state.randomDelayMin} onChange={this.handleChange}/>
                    </label>
                    <label>Random Delay max: 
                        <input name="randomDelayMax" type="number" value={this.state.randomDelayMax} onChange={this.handleChange}/>
                    </label> */}
                    <br/>
                    <input type="submit" value="Submit"/>
                    <br/>
                    <div>
                        {/* {this.state.soundArray.toString()} */}
                        <ul>
                        {this.state.soundArray.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                        </ul>
                    </div>
                </form>
            </div>
           
        );
    }
}

