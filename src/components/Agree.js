import React from 'react';

export default class Agree extends React.Component {
    componentWillReceiveProps (newProp) {
        console.log("旧的：" + this.props.agreeNum + ", 新的：" + newProp.agreeNum)
    }
    shouldComponentUpdate(nextProps, nextState) {
         return true;       
    }
    render () {
        return <div>
            <h2>点赞数：{ this.props.agreeNum }</h2>
        </div>
    }
}