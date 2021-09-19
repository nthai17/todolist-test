import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import { subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

class Form extends Component {
    constructor(props){
        super(props);
        this.state={
            startDate: new Date()
        }
    };
    // hàm click gián tiếp calendar
    openCalendar = ()=>{
        let calendarBox = document.querySelector('.add-form .react-datepicker-wrapper input')
        calendarBox.click()
    };

    render(){
        let {handleAddName, handleAddDesc, handleAddDate, handleAddLevel, 
            addItemName, addItemDesc, addItemDate, addItemLevel, addItem} = this.props
        return(
            <form className="form-box">
                <h2>New Task</h2>
                <div className="form-group new-name-task">
                    <input type="text" placeholder="Add new task" value={addItemName} 
                        onChange={(event)=> handleAddName(event.target.value)}/>
                </div>
                <div className="form-group new-desc-task">
                    <label>Description</label>
                    <textarea type="text" value={addItemDesc} 
                        onChange={(event)=> handleAddDesc(event.target.value)}/>
                </div>
                <div className="row form-wrap">
                    <div className="input-date">
                        <label>Due Date</label>
                        <div>
                            <DatePicker
                                selected={addItemDate}
                                onChange={(date)=> handleAddDate(date)}
                                minDate={subDays(this.state.startDate, 0)}
                            />
                            <div className="date-icon" onClick={this.openCalendar}>
                                <i className="far fa-calendar-alt"></i>
                            </div>
                        </div>
                    </div>
                    <div className="input-level">
                        <label>Piority</label>
                        <select className="new-select-task"
                        value={addItemLevel}
                        onChange={(event) => handleAddLevel(event.target.value)}>
                            <option value="0">Low</option>
                            <option value="1">Normal</option>
                            <option value="2">High</option>
                        </select>
                    </div>
                </div>
                <button type="button" className="btn btn-add"
                onClick={() => addItem()}>Add</button>
            </form>
        )
    }
}

export default Form;