import React from 'react';
import axios from "axios"
import qs from 'qs'
import Agree from './Agree.js'

export default class News extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            agreeNum: 0
        }
    }
    agreeSubmit (obj) {
        axios.post("http://localhost:8080/news.php", qs.stringify({
            newsid: obj.props.newsid  
        })).then(res => {
            this.setState({
                agreeNum: res.data.agree
            })
        })
    }
    componentWillMount () {
        axios.get("http://localhost:8080/news.php", {
            params: {
                newsid: this.props.newsid
            }
        }).then(res => {
            this.setState({
                agreeNum: res.data.agree
            })
        })
    }
    render () {
        return <div>
            <h1>这是一篇新闻,新闻ID是101</h1>
            <Agree agreeNum = {this.state.agreeNum} />            
            <input type = "button" value = "我要点赞" onClick = {() => {
                this.agreeSubmit(this)
            }}/>
        </div>
    }
}