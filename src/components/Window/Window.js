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
            selectedFeature: null,
            action: null
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
            createFeature
        } = this.props;

        let features = this.props.features;

        features = features.sort((a,b) => {
            return moment(a.get('history').last().get('updated_at'))
                .isBefore(b.get('history').last().get('updated_at')) ? 1 : -1;
        })

            return (
            <div>
                <img className="logo" src="./rollout.png" alt="Rollout dashboard" />
                <FloatingActionButton className='btn-add-feature' onClick={openCreateDialog}>
                    <ContentAdd />
                </FloatingActionButton>
                    <Table className="list-rollouts" selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                        <TableRow className="headlines" >
                            <TableHeaderColumn className="num" style={{color: deepOrange700}}>Num</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Feature Name</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Description</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Created by</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Users</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Percentage</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Last Update At</TableHeaderColumn>
                            <TableHeaderColumn style={{color: deepOrange700}}>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody stripedRows={false} displayRowCheckbox={false}  >
                        {features.map((feature, index) => {
                            return (<TableRow className="rollout" key={feature.get('name')}>
                                <TableRowColumn className="num">{index + 1}</TableRowColumn>
                                <TableRowColumn>{feature.get('name')}</TableRowColumn>
                                <TableRowColumn className="">

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
                                <TableRowColumn>{feature.get('last_author')} <br /> {feature.get('last_author_mail') }</TableRowColumn>
                
                            <TableRowColumn>{

                                     <IconMenu
                                         maxHeight={300}
                                         width={100}
                                         useLayerForClickAway={true}
                                        iconButtonElement={<IconButton iconStyle={{color: green500}}>   <FontIcon className="material-icons">supervisor_account</FontIcon></IconButton>}
                                        >
                                        {
                                            feature.get('users').count ?
                                            feature.get('users').map(user => <MenuItem value={1} primaryText={user} />) :
                                            <MenuItem primaryText={"No users"} />
                                        }
                                        </IconMenu>

                                }</TableRowColumn>

                                <TableRowColumn>
                                   <strong className="percentage"> {feature.get('percentage') + '%'}</strong>
                                </TableRowColumn>

                                    <TableRowColumn>{moment(feature.get('history').last().get('updated_at')).fromNow()}</TableRowColumn>


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

                { deleteDialog && <DeleteDialog featureName={deleteDialog.get('featureName')} onClose={closeDeleteDialog} onApproval={deleteFeature} />}
                { editDialog && <EditDialog feature={editDialog.get('feature')} onClose={closeEditDialog} onApproval={updateFeature} />}
                { createDialog && <CreateDialog onClose={closeCreateDialog} onApproval={createFeature} />}
            </div>
        
        )
    }
 }

export default Window;