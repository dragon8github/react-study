import React from 'react'

function MessageHoc (msg) {
    const props = { message : msg }
    return function (Abc) {
        return class extends React.Component {
            render () {
                return <Abc {...props} />
            }
        }
    }
}

export { 
    MessageHoc
}
