import React from 'react'

class BaseError extends React.Component {
    render () {
        const { message } = this.props
        return <div>
            <h3> { message } </h3>
        </div>
    }
}

export { BaseError }
