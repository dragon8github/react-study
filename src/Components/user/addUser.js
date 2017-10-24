import React from 'react'
import { connect } from 'react-redux'

class AddUser extends React.Component {
    render () {
        return <div>
            <h3>新增用户</h3>
        </div>
    }
}

export default connect()(AddUser)