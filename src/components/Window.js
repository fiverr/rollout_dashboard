import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Chip from 'material-ui/Chip';
import Slider from 'material-ui/Slider';


class Window extends React.Component {

    componentDidMount() {
        this.props.getFeatures();
    }

    render() {
        const { features } = this.props;

        return (
            <div>
                <h1> Rollout Dashboard!</h1>
                    <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Num</TableHeaderColumn>
                            <TableHeaderColumn>Feature Name</TableHeaderColumn>
                            <TableHeaderColumn>Last Author Info</TableHeaderColumn>
                            <TableHeaderColumn>Users</TableHeaderColumn>
                            <TableHeaderColumn>Percentage</TableHeaderColumn>
                            <TableHeaderColumn>Creation Info</TableHeaderColumn>
                            <TableHeaderColumn>Percentage</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {features.map((feature, index) => {
                            return (<TableRow key={feature.name}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn>{feature.name}</TableRowColumn>
                                <TableRowColumn>{feature.last_author + feature.last_author_mail }</TableRowColumn>
                                <TableRowColumn>{
                                    feature.users.map(user => <Chip key={user}>{user}</Chip> )
                                }</TableRowColumn>
                                <TableRowColumn>{feature.created_by + feature.created_at }</TableRowColumn>
                                <TableRowColumn>
                                   <span> {feature.percentage}</span>
                                </TableRowColumn>
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </div>
        
        )
    }
 }

export default Window;