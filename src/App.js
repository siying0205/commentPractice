import './index.css'
import avatar from './images/avatar.png'
import React from 'react'


// 时间格式化
function formatDate (time) {
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`

}


class App extends React.Component {
  // 依赖的数据
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot'
      },
      {
        id: 2,
        name: '时间',
        type: 'time'
      }
    ],
    active: 'hot',   // 控制tab激活的关键状态
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1
      }
    ],
    comment: ''   // 评论框中的内容
  }

  // 回调函数 -- tab切换
  changeTab (type) {
    this.setState({
      active: type
    })
  }

  // 受控组件回调
  textareaChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  // 提交评论
  submitComment = () => {
    // state.list 后面添加一项新的
    this.setState({
      list: [
        ...this.state.list,
        {
          id: this.state.list.length + 1,
          author: '我',
          comment: this.state.comment,
          time: new Date(),
          attitude: 0
        }
      ]
    })
  }

  // 删除评论
  delComment = (id) => {
    // 过滤掉id相同的项
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }

  // 切换喜欢
  toggleLike = (id) => {
    // 逻辑：如果是1，就改为0，否则改成1 - attitude
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          item.attitude = item.attitude === 1 ? 0 : 1
        }
        return item
      }
      )
    })
  }

  // 产出UI模板结构
  render () {
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>5 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {this.state.tabs.map((item) => {
                return (
                  <li
                    onClick={() => this.changeTab(item.type)}
                    key={item.id}
                    className={item.type === this.state.active ? 'on' : ''}>按{item.name}排序
                  </li>
                )
              })}
            </ul>
          </div>

          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                value={this.state.comment}
                onChange={this.textareaChange}
              />
              <button className="comment-submit" onClick={this.submitComment}>发表评论</button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {this.state.list.map((item) => {
              return (
                <div className="list-item" key={item.id}>
                  <div className="user-face">
                    <img className="user-head" src={avatar} alt="" />
                  </div>
                  <div className="comment">
                    <div className="user">{item.author}</div>
                    <p className="text">{item.comment}</p>
                    <div className="info">
                      <span className="time">{formatDate(item.time)}</span>
                      {/* 动态类名控制 */}
                      <span
                        onClick={() => { this.toggleLike(item.id) }}
                        className={item.attitude === 1 ? 'like liked' : 'like'}>
                        <i className="icon" />
                      </span>
                      <span className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                        <i className="icon" />
                      </span>
                      <span
                        onClick={() => { this.delComment(item.id) }}
                        className="reply btn-hover">删除</span>
                    </div>
                  </div>
                </div>)

            })}

          </div>
        </div>
      </div>
    )
  }
}


export default App
