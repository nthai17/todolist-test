import React, { Component } from 'react';
import ListItem from './ListItem';
import Form from './Form';
import Items from './mockdata/Items'; 

class App extends Component {
    constructor(props) {    
        super(props);
        this.state = {
            showForm: false,
            addItemName: '',
            addItemDesc: '',
            addItemLevel: '0',
            sortType: '',
            sortOder: '',
            items: Items,
            addItemDate: new Date()
        }
    }
    // hàm xử lý khi click add new task
    addItem = () => {
        let {addItemName, addItemDesc, addItemLevel, addItemDate} = this.state
        if((Items.some((item) => {return item.name === this.state.addItemName})) || this.state.addItemName === '') {
            alert('Task name không được bỏ trống hoặc trùng');
        } else {
            let newItem = {
                id: (Items.length + 1).toString(),
                name: addItemName,
                desc: addItemDesc,
                level: addItemLevel,
                date: addItemDate
            }
            Items.push(newItem);
            this.setState({
                addItemName: '',
                addItemDesc: '',
                addItemLevel: '0',
                addItemDate: new Date()
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
                <ListItem/>     
            </div>
        );
    }
}

export default App;
 