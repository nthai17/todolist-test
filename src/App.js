import React, { Component } from 'react';
import ListItem from './ListItem';
import Form from './Form';

import Items from './mockdata/Items'; 

class App extends Component {
    constructor(props) {    
        super(props);
        let arrLever = [];
        if (Items.length > 0) {
            for (let i=0; i < Items.length; i++) {
                if (arrLever.indexOf(Items[i].level) === -1) {
                    arrLever.push(Items[i].level)
                }
            }
        }
        arrLever.sort((a, b) => a - b)
        this.state = {
            showForm: false,
            arrLever: arrLever,
            addItemName: '',
            addItemDesc: '',
            addItemLevel: '',
            sortType: '',
            sortOder: '',
            items: Items,
            
        }
    }
    
    
    
    addItem = () => {
        if((Items.some((item) => {return item.name === this.state.addItemName})) || this.state.addItemName === '') {
            alert('Trường dữ liệu không được bỏ trống hoặc trùng');
        } else {
            let newItem = {
                id: (Items.length + 1).toString(),
                name: this.state.addItemName,
                desc: this.state.addItemDesc,
                level: this.state.addItemLevel
            }
            Items.push(newItem);
            this.setState({
                addItemName: '',
                addItemLevel: '',
            })
        }
    }
    
    handleAddName = (value) => {
        this.setState({
            addItemName: value
        })
    }
    handleAddDesc = (value) => {
        this.setState({
            addItemDesc: value
        })
    }
    handleAddLevel = (value) => {
        this.setState({
            addItemLevel: value
        })
    }
    handleSort = (sortType, sortOder) => {
        let {items} = this.state;
        this.setState({
            sortType: sortType,
            sortOder: sortOder
        });
        if (sortType === 'name' && sortOder === 'asc'){
            items = items.sort((a, b) => {
                if(a.name < b.name) {return -1}
            })
        };
        if (sortType === 'name' && sortOder === 'desc'){
            items = items.sort((a, b) => {
                if(a.name < b.name) {return -1}
            }).reverse()
        };
        if (sortType === 'level' && sortOder === 'asc'){
            items = items.sort((a, b) => {
                return a.level - b.level
            })
        };
        if (sortType === 'level' && sortOder === 'desc'){
            items = items.sort((a, b) => {
                return a.level - b.level
            }).reverse();
        };
    }
    
    render() {
        return (
            <div className="container row">
                <div className="add-form col-lg-6">
                    <Form showForm={this.state.showForm}
                        arrLever={this.state.arrLever}
                        handleAddName={this.handleAddName}
                        handleAddDesc={this.handleAddDesc}
                        handleAddLevel={this.handleAddLevel}
                        addItem={this.addItem}
                    />
                </div>
                <ListItem/>     
            </div>
        );
    }
}

export default App;
 