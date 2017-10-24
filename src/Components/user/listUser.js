import React from 'react'
import { connect } from 'react-redux'

class ListUser extends React.Component {
    render () {
        return <div>
            <h3>用户列表</h3>
        </div>
    }
}

export default connect()(ListUser)