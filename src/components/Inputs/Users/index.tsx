import * as React from 'react';
import './Users.scss';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

interface UsersProps {
    users: number[];
    onAdd: (userIDs: number[]) => void;
    onDelete: (userID: number) => void;
}

const Users = (props: UsersProps) => {
    return(
        <div className="chips-container">
            <TextField
                className="add-users"
                fullWidth={true}
                floatingLabelText="Users:"
                hintText="Enter user ID and press enter:"
                floatingLabelFixed={true}
                pattern="[\\w-]+"
                onKeyDown={(event) => {
                    if (event.keyCode !== 13) { return; }
                    if (!event.target.value.match(/^[\w\s,-]+$/)) { return; }

                    props.onAdd(event.target.value.replace(/\s/g, '').split(','));
                    event.target.value = '';
                }}
            />
            <div className="users">
            {props.users.map((user: number) => <Chip className="user"
                                                     key={user}
                                                     onRequestDelete={() => { props.onDelete(user); }}> {user} </Chip>)}
            </div>
        </div>
    );
};

export default Users;

