import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from "./components/Counter";
import NameForm from "./components/NameForm";
import NameList from "./components/NameList";

class App extends Component {
    state = {
        names: ['Kyung', 'Seok']
    };

    onInsert = (name) => {
        const {names} = this.state;
        this.setState({
            names: [...names, name]
        })
    };

    render() {
        const {names} = this.state;
        const {onInsert} = this;
        return (
            <div>
                <Counter/>
                <NameForm onInsert={onInsert}/>
                <NameList names={names}/>
            </div>
        );
    }
}

export default App;
