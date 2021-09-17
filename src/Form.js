import React, {Component} from 'react';

class Form extends Component {
    
    render(){
        return(
            <form className="form-box" onSubmit={()=>this.props.addItem()}>
                <h2>New Task</h2>
                <div className="form-group new-name-task">
                    <input type="text" className="form-control" placeholder="Add new task" 
                    onChange={(event)=> this.props.handleAddName(event.target.value)}/>
                </div>
                <div className="form-group new-desc-task">
                    <label>Description</label>
                    <input type="text" className="form-control" 
                    onChange={(event)=> this.props.handleAddDesc(event.target.value)}/>
                </div>
                <div className="row form-wrap">
                    <div className="input-date">
                        <label>Due Date</label>
                    </div>
                    <div className="input-level">
                        <label>Piority</label>
                        <select className="new-name-task"
                        onChange={(event) => this.props.handleAddLevel(event.target.value)}>
                            <option value="0">Loww</option>
                            <option value="1">Nomal</option>
                            <option value="2">High</option>
                        </select>
                    </div>
                </div>
                <button type="button" className="btn-add"
                onClick={() => this.props.addItem()}>Submit</button>
                <button type="button" className="btn-clear"
                onClick={() => this.props.handleCloseAddForm()}>Cancel</button>
            </form>
        )
    }
}

export default Form;