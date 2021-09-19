import React, {Component} from 'react';
import Items from './mockdata/Items'
import Item from './Item';
import Search from './Search';
import BulkActionBox from './BulkBox';

class ListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: Items,
            idEdit: '',
            nameEdit: '',
            levelEdit: '',
            dateEdit: '',
            descEdit: '',
            searchValue: '',
            isSearch: false,
            itemsSearch: [],
            isOpen: false
        }
    };

    // hàm render task
    renderItem = () => {
        let {items, isSearch, itemsSearch, idEdit, levelEdit, nameEdit, descEdit, dateEdit} = this.state;
        if(isSearch) {
            items = itemsSearch;
        }
        if (items.length === 0){
            return <Item item={0}/>
        }
        return items.sort((a, b)=>{return a.date - b.date}).map((item, index) => {
            return (
                <Item key={index} item={item}
                idEdit={idEdit}
                levelEdit={levelEdit}
                nameEdit={nameEdit}
                descEdit={descEdit}
                dateEdit={dateEdit}
                handleEdit={this.handleEdit}
                deleteItem={this.deleteItem} 
                handleEditClickSubmit={this.handleEditClickSubmit}
                handleCancelEdit={this.handleCancelEdit}
                handleEditNameChange={this.handleEditNameChange}
                handleEditDescChange={this.handleEditDescChange}
                handleEditDateChange={this.handleEditDateChange}
                handleEditSelectChange={this.handleEditSelectChange}
                showBulkActionBox={this.showBulkActionBox}
                 />
            )
        })
    };
    
    // hàm hiển thị bulk action box
    showBulkActionBox = () =>{
        this.setState({
            isOpen: true
        })
    };

    // hàm checked all task
    handleCheckAll =()=>{
        let listCheckbox = document.querySelectorAll('.task-info input[type="checkbox"]')
        for (var checkbox of listCheckbox) {
            if (!checkbox.checked) {
                checkbox.checked = true
            }
        }
    };

    // Xử lý xóa các task checked
    deleteItemAll =()=>{
        let {items} = this.state;
        let listCheckbox = document.querySelectorAll('.task-info input[type="checkbox"]:checked')
        for (let checkbox of listCheckbox) {
            let nameOfTaskChecked = checkbox.parentElement.nextElementSibling.textContent
            for (let i=0; i <items.length; i++) {
                if (items[i].name === nameOfTaskChecked) {
                        items.splice(i, 1)
                }
            }
            this.setState({
                items: items,
                isOpen: false
            })
            checkbox.checked = false;
            if(this.state.isSearch){
                this.handleSearch('')
            }
        }
    };

    // xử lý khi điền tìm kiếm theo task name
    handleSearch = (value) => {
        let {items} = this.state;
        let itemsSearch = [...items]
        let newItems = [];
        if (value.length <= 0) {
            this.setState({isSearch:false})
        } else {
            for (let item of itemsSearch) {
                if (item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ){
                    newItems.push(item)
                }
            }
            this.setState({isSearch : true})
        }
        this.setState({
            itemsSearch: newItems,
            searchValue: value
        })
    };

    // hàm đóng form edit task
    handleCancelEdit = () => {
        this.setState({
            idEdit: ''
        })
    };

    // hàm mở form edit task
    handleEdit = (itemIsEdit) => {
        this.setState({
            idEdit : itemIsEdit.id,
            nameEdit : itemIsEdit.name,
            levelEdit: itemIsEdit.level,
            descEdit: itemIsEdit.desc,
            dateEdit: itemIsEdit.date
        })
    };

    // hàm xử lý khi sửa task name
    handleEditNameChange = (value) => {
        this.setState({
            nameEdit: value
        })
    };

    // hàm xử lý khi sửa mô tả
    handleEditDescChange = (value) => {
        this.setState({
            descEdit: value
        })
    };

    // hàm xử lý khi sửa ngày
    handleEditDateChange = (value) => {
        this.setState({
            dateEdit: value
        })
    };

    // hàm xử lý khi sửa level
    handleEditSelectChange = (value) => {
        this.setState({
            levelEdit: value
        })
    };

    // hàm thay đổi nội dung task khi click save
    handleEditClickSubmit = () => {
        let {nameEdit, idEdit, descEdit, levelEdit, dateEdit} = this.state;
        if (Items.length > 0) {
            if((Items.some((item) => {return ((item.name === nameEdit) && item.id !== idEdit)})) || nameEdit === '') {
                alert('Task name không được bỏ trống hoặc trùng');
            } else {
                for (let i = 0; i < Items.length; i++) {
                    if (Items[i].id === idEdit) {
                        Items[i].name = nameEdit;
                        Items[i].desc = descEdit;
                        Items[i].level = levelEdit;
                        Items[i].date = dateEdit;
                        break;
                    }
                }
            }
            this.setState({
            idEdit: ''
            })
        }
    };
   
    // hàm xóa item
    deleteItem = (itemIsDel) => {
        var {items} = this.state;
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++){
                if (items[i].id === itemIsDel.id) {
                    items.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({
            items: items
        })
        if (this.state.isSearch){
            this.handleSearch('')
        }
    };
    
    render() {
        return(
            <div className="list-task col-lg-6">
                <div>
                    <h2>List Item</h2>
                    <Search handleSearch={this.handleSearch} searchValue={this.state.searchValue}/>
                    {this.renderItem()}
                </div>
                <BulkActionBox 
                    isOpen={this.state.isOpen}
                    handleCheckAll={this.handleCheckAll}
                    deleteItemAll={this.deleteItemAll}
                />
            </div>
        )
    }
}
export default ListItem;