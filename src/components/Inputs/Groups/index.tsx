import * as React from 'react';
import './Groups.scss';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

interface GroupsProps {
    groups: string[];
    onAdd: (group: string) => void;
    onDelete: (group: string) => void;
}

const Groups = (props: GroupsProps) => {
    return(
        <div className="chips-container">
            <TextField
                className="add-groups"
                fullWidth={true}
                floatingLabelText="Groups:"
                hintText="Enter group name and press enter:"
                floatingLabelFixed={true}
                onKeyDown={(event) => {
                    if (event.keyCode !== 13) { return; }

                    props.onAdd(event.target.value);
                    event.target.value = '';
                }}
            />
            {props.groups.map((group: string) => <Chip className="group"
                                                     key={group}
                                                     onRequestDelete={() => { props.onDelete(group); }}> {group} </Chip>)}
        </div>
    );
};

export default Groups;

