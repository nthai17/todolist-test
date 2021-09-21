import React, { Component } from 'react';
import ListItem from './ListItem';
import Form from './Form';

class App extends Component {
    constructor(props) {    
        super(props);
        this.state = {
            addItemName: '',
            addItemDesc: '',
            addItemLevel: '0',
            items: [],
            addItemDate: new Date(),
        }
    };
    
    async componentDidMount(){
        await fetch('https://61484f11035b3600175b9d81.mockapi.io/tasks')
        .then(res=>res.json())
        .then((data)=>{
            // parse date từ String sang Date
            data.forEach((task)=>{
                return task.date = new Date(task.date)
            })
            this.setState({items: data})
        })
    }

    // hàm xử lý khi click add new task
    addItem = () => {
        let {addItemName, addItemDesc, addItemLevel, addItemDate, items} = this.state
        if((items.some((item) => {return item.name === this.state.addItemName})) || this.state.addItemName === '') {
            alert('Task name không được bỏ trống hoặc trùng');
        } else {
            let newItem = {
                id: (items.length + 1).toString(),
                name: addItemName,
                desc: addItemDesc,
                level: addItemLevel,
                date: addItemDate
            }
            items.push(newItem);
            this.setState({
                items: items,
                addItemName: '',
                addItemDesc: '',
                addItemLevel: '0',
                addItemDate: new Date(),
            })
        }
    };
    
    
    // hàm xử lý điền tên
    handleAddName = (value) => {
        this.setState({
            addItemName: value
        })
    };

    // hàm xử lý điền mô tả
    handleAddDesc = (value) => {
        this.setState({
            addItemDesc: value
        })
    };

    // hàm xử lý chọn level
    handleAddLevel = (value) => {
        this.setState({
            addItemLevel: value
        })
    };

    // hàm xử lý chọn ngày
    handleAddDate = (value) => {
        this.setState({
            addItemDate: value
        })
    };
    
    render() {
        return (
            <div className="container row">
                <div className="add-form col-lg-6">
                    <Form 
                        handleAddName={this.handleAddName}
                        handleAddDesc={this.handleAddDesc}
                        handleAddLevel={this.handleAddLevel}
                        handleAddDate={this.handleAddDate}
                        addItem={this.addItem}
                        addItemName={this.state.addItemName}
                        addItemDesc={this.state.addItemDesc}
                        addItemLevel={this.state.addItemLevel}
                        addItemDate={this.state.addItemDate}
                    />
                </div>
                <ListItem items={this.state.items}/>
            </div>
        );
    }
}

export default App;
 