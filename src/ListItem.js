import React, {Component} from 'react';
import Items from './mockdata/Items'
import Item from './Item';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import Search from './Search';


class ListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: Items,
            showAlert: false,
            titleAlert: '',
            idAlert:'',
            idEdit: '',
            nameEdit: '',
            levelEdit: '',
            descEdit: '',
            searchValue: '',
            isSearch: false,
            itemsSearch: []
        }
    }
    renderItem = () => {
        let {items} = this.state;
        if(this.state.isSearch) {
            items = this.state.itemsSearch;
        }
        if (items.length === 0){
            return <Item item={0}/>
        }
        return items.map((item, index) => {
            
            return (
                <Item key={index} item={item}
                idEdit={this.state.idEdit}
                levelEdit={this.state.levelEdit}
                nameEdit={this.state.nameEdit}
                descEdit={this.state.descEdit}
                handleEdit={this.handleEdit}
                handleAlert={this.handleAlert} 
                handleEditClickSubmit={this.handleEditClickSubmit}
                handleCancelEdit={this.handleCancelEdit}
                handleEditNameChange={this.handleEditNameChange}
                handleEditDescChange={this.handleEditDescChange}
                handleEditSelectChange={this.handleEditSelectChange}
                 />
            )
        })
    }
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
    }
    handleCancelEdit = () => {
        this.setState({
            idEdit: ''
        })
    }
    handleEdit = (itemIsEdit) => {
        this.setState({
            idEdit : itemIsEdit.id,
            nameEdit : itemIsEdit.name,
            levelEdit: itemIsEdit.level,
            descEdit: itemIsEdit.desc
        })
    }
    handleEditNameChange = (value) => {
        this.setState({
            nameEdit: value
        })
    }
    handleEditDescChange = (value) => {
        this.setState({
            descEdit: value
        })
    }
    handleEditSelectChange = (value) => {
        this.setState({
            levelEdit: value
        })
    }
    handleEditClickSubmit = () => {
        if (Items.length > 0) {
            if((Items.some((item) => {return ((item.name === this.state.nameEdit) && item.id !== this.state.idEdit)})) || this.state.nameEdit === '') {
                alert('Trường dữ liệu không được bỏ trống hoặc trùng');
            }else{
                for (let i = 0; i < Items.length; i++) {
                    if (Items[i].id === this.state.idEdit) {
                        Items[i].name = this.state.nameEdit;
                        Items[i].desc = this.state.descEdit;
                        Items[i].level = this.state.levelEdit;
                        break;
                    }
                }
            }
            this.setState({
            idEdit: ''
            })
        }
    }   
    handleAlert = (itemAlert) => {
        this.setState({
            showAlert: true,
            titleAlert: itemAlert.name,
            idAlert: itemAlert.id
        })
    }
    deleteItem = () => {
        let {items, idAlert} = this.state;
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++){
                if (items[i].id === idAlert) {
                    items.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({
            showAlert: false
        })
    }
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
    }
    render() {
        return(
            <div className="list-tast col-lg-6">
                <SweetAlert
                show={this.state.showAlert}
                title='Delete task'
                text={this.state.titleAlert}
                showCancelButton
                onOutsideClick={()  => this.setState({ showAlert: false })}
                onEscapeKey={()     => this.setState({ showAlert: false })}
                onCancel={()        => this.setState({ showAlert: false })}
                onConfirm={()       => this.deleteItem()}
                />
                <h2 className="panel-heading">List Item</h2>
                <Search handleSearch={this.handleSearch} searchValue={this.state.searchValue}/>
                {this.renderItem()}  
            </div>
                )
            }
}
export default ListItem;