import React, {Component} from 'react';

class Item extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    render() {
        let {item, handleEditNameChange,
            handleEditDescChange} = this.props;
        if (item === 0) {
            return (
                <div className="task-item">
                    <span>No task</span>
                </div>
            )
        }
        return(
            <div className="task-item">
                <div>
                    <input type="checkbox"/>
                    <span>{item.name}</span>
                </div>
                <div>
                    <button type="button" className="btn btn-warning" 
                    onClick={() => this.props.handleEdit(item)} >Edit
                    </button>
                    <button type="button" className="btn btn-danger" 
                    onClick={() => this.props.handleAlert(item)}>Delete</button>
                </div>
                {(this.props.idEdit === item.id) 
                ? <form className="form-box" onSubmit={()=>this.props.addItem()}>
                    <div className="form-group new-name-task">
                        <input type="text" className="form-control" value={this.props.nameEdit} 
                        onChange={(event) => handleEditNameChange(event.target.value)}/>
                    </div>
                    <div className="form-group new-desc-task">
                        <label>Description</label>
                        <input type="text" className="form-control" value={this.props.descEdit}  
                        onChange={(event) => handleEditDescChange(event.target.value)}/>
                    </div>
                    <div className="row form-wrap">
                        <div className="input-date">
                            <label>Due Date</label>
                        </div>
                        <div className="input-level">
                            <label>Piority</label>
                            <select className="new-name-task" value={this.props.levelEdit}
                            onChange={(event) => this.props.handleEditSelectChange(event.target.value)}>
                                <option value="0">Loww</option>
                                <option value="1">Nomal</option>
                                <option value="2">High</option>
                            </select>
                        </div>
                    </div>
                    <button type="button" className="btn-add"
                    onClick={() => this.props.handleEditClickSubmit()}>Save</button>
                    <button type="button" className="btn-clear"
                    onClick={() => this.props.handleCancelEdit()}>Cancel</button>
                </form> : null
                }
            </div>
        )
    }
}

export default Item;