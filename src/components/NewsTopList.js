import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default class NewsTopList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            dataList: []
        }
    }
    componentWillMount () {
        axios.get('http://localhost:8080/toplist.php?type=news').then(res => {
            this.setState({
                dataList: res.data
            })
        })
    }
    render () {
        return <dl>
            <dt>新闻列表</dt>
            {
                this.state.dataList.map((item, index) => {
                    return <dd key = {index}>
                        <Link to = {'/news/' + item.newsid}>{ item.title }</Link>
                        <article>{ item.desc }</article>
                    </dd>
                })
            }
        </dl>
    }
}