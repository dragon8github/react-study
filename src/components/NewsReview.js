import React from 'react'
import { connect } from 'react-redux'

function mapStateToProps (state) {
    console.log(state)
    return {
        reviewList: state.ReviewReduce.rlist
    }
}

function mapDispatchToProps (dispatch) { 
    return {
        textChange: e  => dispatch({ type: 'REVIEW_CONTENT_CHANGE', content: e.target.value }),
        loadReview: () => dispatch({ type: 'REVIEW_LOAD' }),
        postReview: () => dispatch({ type: 'REVIEW_POST' })
    }
}

class TestReviewList extends React.Component {
    componentWillMount () {
        const { loadReview } = this.props
        loadReview()
    }
    render () {

        const { reviewList, textChange, postReview } = this.props

        return <div>
            <div className = 'newscontent'>
                <h1>全球的开发新趋势调查</h1>
                <article>在全球著名 IT 技术网站 Stack Overflow 上，我们可以基于该网站的开发者调查数据，了解全球的开发新趋势及动态。 Stack Overflow 分析了其网站上各编程语言的标签的访问情况： 发达国家程序员喜欢 Python、R（重视科研）、C 与 C++（重视教育）； 欠发达国家的喜欢 PHP 与 Android 开发 </article>
            </div>
            <h2>评论区域</h2>
            <dl>
                 <dt>输入评论内容</dt>
                 <dd><textarea className='review' onChange = {e => { textChange(e) }}/></dd>
                 <dd><input className = 'cmd' type = 'button' value = '提交'  onClick = { postReview }/></dd>
            </dl>
            <h3>评论列表区域</h3>
            <ul>
                {
                    reviewList.map((item, index) => {
                        return <li key = { index }> { item } </li>
                    }
                )}
            </ul>
        </div>
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(TestReviewList)

export default App