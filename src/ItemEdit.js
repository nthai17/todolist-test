import React, {Component} from 'react';

class ItemEdit extends Component {
    render() {
        if(!this.props.showDetail){
            return null;
        }
        return(
            <form className="form-box" onSubmit={()=>this.props.addItem()}>
                <div className="form-group new-name-task">
                    <input type="text" className="form-control" value={this.props.nameEdit} 
                    onChange={(event)=> this.props.handleAddInputChange(event.target.value)}/>
                </div>
                <div className="form-group new-desc-task">
                    <label>Description</label>
                    <input type="text" className="form-control" 
                    onChange={(event)=> this.props.handleAddInputChange(event.target.value)}/>
                </div>
                <div className="row form-wrap">
                    <div className="input-date">
                        <label>Due Date</label>
                    </div>
                    <div className="input-level">
                        <label>Piority</label>
                        <select className="new-name-task" value={this.props.levelItem}
                        onChange={(event) => this.props.handleAddSelectChange(event.target.value)}>
                            <option value="0">Loww</option>
                            <option value="1">Nomal</option>
                            <option value="2">High</option>
                        </select>
                    </div>
                </div>
                <button type="button" className="btn-add"
                onClick={() => this.props.handleEditClickSubmit()}>Save</button>
                <button type="button" className="btn-clear"
                onClick={() => this.props.handleCloseEditForm()}>Cancel</button>
            </form>
        )
    }
}

export default ItemEdit;