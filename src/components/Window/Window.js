import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import moment from 'moment'
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import EditDialog from '../EditDialog/EditDialog';
import CreateDialog from '../CreateDialog/CreateDialog';
import {redA700, grey50, deepOrange700, green500} from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import './Window.scss';


class Window extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: null
        }
    }

    componentDidMount() {
        this.props.getFeatures();
    }

    render() {

        const {
            deleteDialog,
            openDeleteDialog,
            closeDeleteDialog,
            deleteFeature,
            createDialog,
            closeCreateDialog,
            openCreateDialog,
            updateFeature,
            editDialog,
            openEditDialog,
            closeEditDialog,
            createFeature,
            snakeMessage,
            clearSnakeMessage
        } = this.props;

        let features = this.props.features;

        features = features.sort((a, b) => {
            const lastRecordA = a.get('history').last();
            const lastRecordB = b.get('history').last();

            if(!lastRecordB || !lastRecordB) { return 0}

            return moment(lastRecordA)
                .isBefore(lastRecordB) ? 1 : -1;
        });

        if(this.state.filter) {
            features = features.filter(f => {
                const regex = new RegExp(this.state.filter, 'gi');
                return (f.get('name') || '').match(regex) ||
                    (f.get('description') || '').match(regex) ||
                    (f.get('created_by') || '').match(regex) ||
                    (f.get('created_by_mail') || '').match(regex) ||
                    (f.get('percentage') || '').toString().match(regex);
            }
        )}

        return (
            <div>
                <img className="logo" src="./rollout.png" alt="Rollout dashboard"/>
                <FloatingActionButton className='btn-add-feature' onClick={openCreateDialog}>
                    <ContentAdd />
                </FloatingActionButton>
                <TextField
                    className="filter"
                    floatingLabelText="Filter Features:"
                    hintText="Insert Query And Press Enter:"
                    floatingLabelFixed={true}
                    fullWidth={true}
                    onKeyDown={(event) => {
                        if(event.keyCode !== 13) { return; }
                        this.setState({filter: event.target.value})
                    }}
                />

                <Table className="list-rollouts" selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                        <TableRow className="headlines">
                            <TableHeaderColumn className="num" style={{color: deepOrange700}}>Num</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Feature Name</TableHeaderColumn>
                            <TableHeaderColumn className="description" style={{color: deepOrange700}}>Description</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Created by</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Users</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>History</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Percentage</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Last Update By</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Last Update At</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody stripedRows={false} displayRowCheckbox={false}>
                        {features.map((feature, index) => {

                            const lastRecord = feature.get('history').last();

                            return (<TableRow className="rollout" key={feature.get('name')}>
                                    <TableRowColumn className="num">{index + 1}</TableRowColumn>
                                    <TableRowColumn>{feature.get('name')}</TableRowColumn>
                                    <TableRowColumn className="description">

                                        <Card>
                                            <CardHeader
                                                subtitle={'Show Description'}
                                                actAsExpander={true}
                                                showExpandableButton={true}
                                            />
                                            <CardText expandable={true} style={{whiteSpace: 'pre-line'}}>
                                                <p>{feature.get('description')} </p>
                                            </CardText>
                                        </Card>


                                    </TableRowColumn>
                                    <TableRowColumn>{feature.get('created_by')}</TableRowColumn>

                                    <TableRowColumn>
                                        {<IconMenu
                                            maxHeight={300}
                                            width={100}
                                            useLayerForClickAway={true}
                                            iconButtonElement={<IconButton iconStyle={{color: green500}}> <FontIcon
                                                className="material-icons">supervisor_account</FontIcon></IconButton>}>
                                                {
                                                feature.get('users').count ?
                                                    feature.get('users').map(user => <MenuItem key={user} value={1}
                                                                                               primaryText={user}/>) :
                                                    <MenuItem primaryText={"No users"}/>
                                                }
                                        </IconMenu>}
                                    </TableRowColumn>

                                    <TableRowColumn>
                                        {<IconMenu
                                            maxHeight={300}
                                            width={500}
                                            useLayerForClickAway={true}
                                            iconButtonElement={<IconButton iconStyle={{color: 'yellow'}}> <FontIcon
                                                className="material-icons">history</FontIcon></IconButton>}>
                                                 { feature.get('history').reverse().map(record =>
                                                     <MenuItem primaryText={
                                                         <div className="history">
                                                             <small>{record.get('last_author')}</small>
                                                             <small>{record.get('percentage')}%</small>
                                                             <small>{moment(record.get('updated_at')).fromNow()}</small>
                                                         </div>
                                                     } />) }

                                        </IconMenu>}
                                    </TableRowColumn>

                                    <TableRowColumn>
                                        <strong className="percentage"> {feature.get('percentage') + '%'}</strong>
                                    </TableRowColumn>


                                    <TableRowColumn>
                                        {feature.get('last_author')}
                                        <br />
                                        {feature.get('last_author_mail') }
                                    </TableRowColumn>

                                    <TableRowColumn>{lastRecord && moment(lastRecord.get('updated_at')).fromNow()}</TableRowColumn>

                                    <TableRowColumn>
                                        <IconMenu
                                            maxHeight={300}
                                            width={100}
                                            useLayerForClickAway={true}
                                            iconButtonElement={<IconButton> <FontIcon className="material-icons">settings</FontIcon></IconButton>}
                                        >
                                            <MenuItem
                                                primaryText="DELETE"
                                                onKeyDown={(event) => {
                                                    if(event.keyCode != 13) { return; }
                                                    openDeleteDialog(feature.get('name'));
                                                  }}
                                                onClick={() => {
                                                    openDeleteDialog(feature.get('name'));
                                                }}
                                            />
                                            <MenuItem primaryText="EDIT"
                                                      onClick={() => {
                                                          openEditDialog(feature);
                                                      }}
                                                      onKeyDown={(event) => {
                                                          if(event.keyCode != 13) { return; }
                                                          openEditDialog(feature);
                                                      }}
                                            />
                                        </IconMenu>
                                    </TableRowColumn>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                { deleteDialog && <DeleteDialog featureName={deleteDialog.get('featureName')} onClose={closeDeleteDialog} onApproval={deleteFeature}/>}
                { editDialog && <EditDialog feature={editDialog.get('feature')} onClose={closeEditDialog} onApproval={updateFeature}/>}
                { createDialog && <CreateDialog onClose={closeCreateDialog} onApproval={createFeature}/>}
                { snakeMessage  && <Snackbar open={true} message={snakeMessage} autoHideDuration={5000} onRequestClose={clearSnakeMessage} /> }
            </div>
        )
    }
}

export default Window;