import React from 'react';
import './Users.scss';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';


const Users = ({users, onAdd, onDelete}) => {

    return(
        <div className="chips-container">
            <TextField
                className="add-users"
                fullWidth={true}
                floatingLabelText="Users:"
                hintText="Enter user ID and press enter:"
                floatingLabelFixed={true}
                onKeyDown={(event) => {
                    if(event.keyCode !== 13) { return; }
                    if(!event.target.value.match(/^\d+$/)) { return; }
                    onAdd(event.target.value);
                    event.target.value = '';
                }}
            />
            {users.map((user)=> {
                return (<Chip className="user" key={user} onRequestDelete={() => { onDelete(user) }}> {user} </Chip>)
            })}
        </div>
    )
};

export default Users;

