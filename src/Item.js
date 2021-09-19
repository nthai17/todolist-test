import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import { subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

class Item extends Component {
    constructor(props){
        super(props);
        this.state={
            startDate: new Date()
        }
    };
    // hàm click gián tiếp calendar
    openCalendar = ()=>{
        var calendarBox = document.querySelector('.list-task .react-datepicker-wrapper input')
        calendarBox.click()
    };

    render() {
        let {item, nameEdit, descEdit, dateEdit, levelEdit,
            handleEditNameChange, handleEditDescChange, handleEditDateChange, handleEditSelectChange,
            handleEdit, deleteItem, handleEditClickSubmit, handleCancelEdit, showBulkActionBox} = this.props;
        let classNameItem = '';
        switch (item.level) {
            case '0':
                classNameItem = 'task-info low-color';
                break;
            case '1':
                classNameItem = 'task-info normal-color';
                break;
            default:
                classNameItem = 'task-info high-color';
                break;
        }
        if (item === 0) {
            return (
                <div className="task-item">
                    <span>No task</span>
                </div>
            )
        }
        return(
            <div className="task-item">
                <div className={classNameItem}>
                    <div>
                        <label>
                            <input className="checkbox" type="checkbox" onChange={()=>showBulkActionBox()}/>
                            <span className="checkmark"></span>
                        </label>
                        <span>{item.name}</span>
                    </div>
                    <div>
                        <button type="button" className="btn btn-warning" 
                        onClick={() => handleEdit(item)} >Edit
                        </button>
                        <button type="button" className="btn btn-danger" 
                        onClick={() => deleteItem(item)}>Delete
                        </button>
                    </div>
                </div>
                {(this.props.idEdit === item.id) 
                ? 
                <form className="form-box">
                    <div className="form-group new-name-task">
                        <input type="text" value={nameEdit} 
                            onChange={(event) => handleEditNameChange(event.target.value)}/>
                    </div>
                    <div className="form-group new-desc-task">
                        <label>Description</label>
                        <textarea type="text" value={descEdit}  
                            onChange={(event) => handleEditDescChange(event.target.value)}/>
                    </div>
                    <div className="row form-wrap">
                        <div className="input-date">
                            <label>Due Date</label>
                            <div>
                                <DatePicker
                                    selected={dateEdit}
                                    onChange={(date) => handleEditDateChange(date)}
                                    minDate={subDays(this.state.startDate, 0)}
                                />
                                <div className="date-icon" onClick={this.openCalendar}>
                                    <i className="far fa-calendar-alt"></i>
                                </div>
                            </div>
                        </div>
                        <div className="input-level">
                            <label>Piority</label>
                            <select className="new-select-task" value={levelEdit}
                                onChange={(event) => handleEditSelectChange(event.target.value)}>
                                <option value="0">Low</option>
                                <option value="1">Normal</option>
                                <option value="2">High</option>
                            </select>
                        </div>
                    </div>
                    <button type="button" className="btn btn-add"
                        onClick={() => handleEditClickSubmit()}>Save</button>
                    <button type="button" className="btn btn-clear"
                        onClick={() => handleCancelEdit()}>Cancel</button>
                </form> 
                : null
                }
            </div>
        )
    }
}

export default Item;