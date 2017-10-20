import React from 'react'
import { connect } from 'react-redux'
import axios from "axios"

// 本来应当放在 actions.js 中独立开来的, 但考虑到函数的数量少就省略了
function NewsThunk() {
   return function (dispatch, state) {
        axios.get('http://localhost:8080/toplist.php?type=news').then(res => dispatch({
            type: 'GET_NEWS', 
            getNews: res.data
        }))
    }
}

function mapStateToProps (state) {
    return {
        getNewsList: state.NewsReduce.newslist
    }
}

function mapDispatchToProps (dispatch) {
    return {
        loadNews: () => {
            dispatch(NewsThunk())
        }
    }
}

class TestNewsList extends React.Component {
    componentWillMount () {
        const { loadNews } = this.props
        loadNews()
    }
    render () {
        const { getNewsList } = this.props
        return <div>
            <h2>新闻列表</h2>
            <ul>
                {
                    getNewsList.map(item => {
                        return <li key = { item.newsid }> { item.title } </li>
                    })
                }
            </ul>
        </div>
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(TestNewsList)

export default App