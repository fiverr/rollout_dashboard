import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Chip from 'material-ui/Chip';
import Slider from 'material-ui/Slider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import CreateDialog from '../CreateDialog/CreateDialog';
import {redA700, grey50, deepOrange700, green500} from 'material-ui/styles/colors';
import './Window.scss';


class Window extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFeature: null,
            action: null
        }
    }



    componentDidMount() {
        this.props.getFeatures();
    }


    

    render() {
        const { features,
                deleteDialog,
            openDeleteDialog,
            closeDeleteDialog,
            deleteFeature,
            createDialog,
            openCreateDialog
        } = this.props;

        return (
            <div>
                <h1> Rollout Dashboard!</h1>
                    <Table className="list-rollouts">
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                        <TableRow className="headlines" >
                            <TableHeaderColumn style={{color: deepOrange700}}>Num</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Feature Name</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Created by</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Users</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Last Update At</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Percentage</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody stripedRows={false} displayRowCheckbox={false} >
                        {features.map((feature, index) => {
                            return (<TableRow className="rollout" key={feature.get('name')}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn>{feature.get('name')}</TableRowColumn>
                                <TableRowColumn>{feature.get('last_author') + feature.get('last_author_mail') }</TableRowColumn>
                
                            <TableRowColumn>{

                                     <IconMenu
                                         maxHeight={300}
                                         width={100}
                                         useLayerForClickAway={true}
                                        iconButtonElement={<IconButton iconStyle={{color: green500}}>   <FontIcon className="material-icons">supervisor_account</FontIcon></IconButton>}
                                        >
                                                    {
                                                        feature.get('users').length ?
                                                        feature.get('users').map(user => <MenuItem value={1} primaryText={user} />) :
                                                        <MenuItem primaryText={"No users"} />
                                                        }

                                        </IconMenu>

                            
                                }</TableRowColumn>
                                <TableRowColumn>{moment(feature.get('history').last()).get('updated_at').fromNow()}</TableRowColumn>
                            
                                <TableRowColumn>
                                   <span> {feature.get('percentage')}</span>
                                </TableRowColumn>
                                <TableRowColumn>
                                       <IconMenu
                                         maxHeight={300}
                                         width={100}
                                         useLayerForClickAway={true}
                                        iconButtonElement={<IconButton>   <FontIcon className="material-icons">settings</FontIcon></IconButton>}
                                        >
                                            <MenuItem onClick={() => {
                                                openDeleteDialog(feature.get('name'));
                                            }}  primaryText="DELETE" />
                                            <MenuItem primaryText="EDIT"
                                                      onClick={() => {
                                                          openCreateDialog(feature);
                                                      }}
                                            />
                                        </IconMenu>
                                </TableRowColumn>
                            </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                { deleteDialog && <DeleteDialog featureName={deleteDialog.get('featureName')} onClose={closeDeleteDialog} onApproval={deleteFeature} />}
                { createDialog && <CreateDialog feature={createDialog.get('feature')} onClose={closeDeleteDialog} onApproval={deleteFeature} />}
            </div>
        
        )
    }
 }

export default Window;