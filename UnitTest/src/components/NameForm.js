import React, {Component} from 'react';

class NameForm extends Component {
    static defaultProps = {
        onSubmit: () => {console.error('onSubmit is not defined')}
    };

    state = {
        name: ''
    };

    onChange = (e) => {
        this.setState({
            name: e.target.value
        })
    };

    onSubmit = (e) => {
        const {name} = this.state;
        const {onInsert} = this.props;

        onInsert(name);
        this.setState({
            name: ''
        });

        e.preventDefault() // submit 하면 기본적으로는 페이지가 새로고쳐지게 되는데 이를 방지

    };

    render(){
        const {onSubmit, onChange} = this;
        const {name} = this.state;

        return(
            <form onSubmit={onSubmit}>
                <label>이름</label>
                <input name="name" type="text" value={name} onChange={onChange}/>
                <button type="submit">등록</button>
            </form>
        )
    }
}

export default NameForm;