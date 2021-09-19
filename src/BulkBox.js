import React, {Component} from 'react';
class BulkActionBox extends Component {
    render(){
        let {isOpen, handleCheckAll, deleteItemAll} = this.props
        if (!isOpen) {
            return null
        }
        return(
            <div className="bulk-action-box">
                <div>
                    <span>Bulk Action:</span>
                </div>
                <div>
                    <button type="button" className="btn btn-warning" 
                        onClick={() => handleCheckAll()} >Done
                    </button>
                    <button type="button" className="btn btn-danger" 
                        onClick={() => deleteItemAll()}>Delete
                    </button>
                    </div>
            </div>
        )
    }
}
export default BulkActionBox