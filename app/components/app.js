import React from 'react'
import ReactDOM from 'react-dom'

class TodoFooter extends React.Component {
    allChangeCheck() {
        let allCheck = !this.props.allChecked;
        this.props.allCheck(allCheck, null, true)
    }
    deleteAllTodos() {
        this.props.deleteTodo(this.props.index)
    }
    render() {
        return ( < div className = "footer"
            style = {
                {
                    display: this.props.todos.length ? '' : 'none'
                }
            } >
            < input type = "checkbox"
            checked = {
                this.props.allChecked
            }
            onChange = {
                this.allChangeCheck.bind(this)
            }
            className = "check"
            id = "check-box" / > {
                this.props.checkedNum
            } < label htmlFor = "check-box" > 全选 < /label>   < button className = "allDeleteBtn"
            disabled = {
                this.props.allChecked ? false : true
            }
            onClick = {
                this.deleteAllTodos.bind(this)
            } > 全部清除 < /button> < /div >
        )
    }
}

class TodoItem extends React.Component {
    delItem() {
        this.props.deleteTodo(this.props.index)
    }
    onChangeItem() {
        let isChecked = !this.props.val.itemChecked;
        this.props.allCheck(isChecked, this.props.index, false)

    }
    render() {
        return ( < li className = {
                this.props.val.itemChecked ? 'checked-li' : ''
            } >
            < input ref = "checkBtn"
            type = "checkbox"
            className = "check"
            checked = {
                this.props.val.itemChecked
            }
            onChange = {
                this.onChangeItem.bind(this)
            }
            />  < label > {
            this.props.val.text
        } < /label > < button className = "del"
        style = {
            {
                display: this.props.val.itemChecked ? 'block' : 'none'
            }
        }
        onClick = {
            this.delItem.bind(this)
        } > < /button> < /li >
    )
}
}

class TodoList extends React.Component {
    render() {
        return ( < ul > {
                this.props.todos.map((item, index) => {
                    return <TodoItem key = { index }
                    val = { item }
                    index = { index } {...this.props }
                    />
                })
            } < /ul>)
        }
    }

    class App extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                todos: [{
                    text: 111,
                    itemChecked: false
                }, {
                    text: 222,
                    itemChecked: false
                }],
                allChecked: false,
                checkedNum: 0
            }
        }

        //删除
        delTodoItem(index) {
                if (typeof index === "undefined") {
                    this.setState({
                        todos: [],
                        allChecked: false,
                        checkedNum: 0

                    });
                } else {
                    this.state.todos.splice(index, 1)
                    if (this.state.todos.length) {
                        this.setState({
                            todos: this.state.todos,
                            checkedNum: this.state.todos.reduce((n, todos) => todos.itemChecked ? n + 1 : n, 0)
                        });
                    } else {
                        this.setState({
                            todos: this.state.todos,
                            allChecked: false,
                            checkedNum: this.state.todos.reduce((n, todos) => todos.itemChecked ? n + 1 : n, 0)
                        });
                    }
                }

            }
            //判断是否全选
        itemAllChecked() {
                if (this.state.todos.every((todo) => todo.itemChecked)) {
                    this.setState({
                        todos: this.state.todos,
                        allChecked: true,
                        checkedNum: this.state.todos.reduce((n, todos) => todos.itemChecked ? n + 1 : n, 0)
                    })
                }
            }
            //全选
        allChecked(isChecked, index, allCheck = false) {
                if (allCheck) {
                    this.setState({
                        todos: this.state.todos.map((item) => {
                            item.itemChecked = isChecked
                            return item
                        }),
                        allChecked: isChecked,
                        checkedNum: this.state.todos.reduce((n, todos) => todos.itemChecked ? n + 1 : n, 0)

                    })
                } else {
                    this.state.todos[index].itemChecked = isChecked
                    this.setState({
                        todos: this.state.todos,
                        allChecked: false,
                        checkedNum: this.state.todos.reduce((n, todos) => todos.itemChecked ? n + 1 : n, 0)
                    })
                    this.itemAllChecked()
                }
            }
            //回车输入
        onkeyUp(e) {
            if (e.keyCode === 13) {
                let value = e.target.value

                if (!value) return false
                let todosObj = {
                    text: value,
                    itemChecked: false
                }
                this.setState((state) => {
                    state.todos.push(todosObj)
                    state.allChecked = false
                });
                e.target.value = ""
            }
        }
        render() {
            return ( < div className = "todos-wrap" >
                < input onKeyUp = {
                    this.onkeyUp.bind(this)
                }
                type = "text"
                placeholder = "Enter in" / >
                < TodoList todos = {
                    this.state.todos
                }
                deleteTodo = {
                    this.delTodoItem.bind(this)
                }
                allCheck = {
                    this.allChecked.bind(this)
                }
                />  < TodoFooter deleteTodo = {
                this.delTodoItem.bind(this)
            } {...this.state
            }
            allCheck = {
                this.allChecked.bind(this)
            }
            / >< /div > );
    }
}
export default App