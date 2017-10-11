import React from 'react';

export default class InfoDetail extends React.Component
{
    render()
    {
        return <div>
            <h2>这是我们的新闻详细页</h2>
            <div>
                获取到的参数ID是:{this.props.match.params.newsid}
            </div>
        </div>
    }
}