import React from 'react'
import axios from 'axios'

export default class ProductTopList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            dataList: []
        }
    }
    componentWillMount () {
        axios.get('http://localhost:8080/toplist.php').then(res => {
            this.setState({
                dataList: res.data
            })
        })
    }
    render () {
        return <dl>
            <dt>商品排行榜</dt>
            {
                 this.state.dataList.map((item, index) => { 
                    return <dd key = {index}>
                        <a href = '#'>{ item.prodName }</a>
                    </dd>
                })
            }
        </dl>
    }
}