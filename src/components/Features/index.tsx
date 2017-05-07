import * as React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import {green500, amber500, blueGrey500 } from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Logo from '../Logo/';
import * as moment from 'moment';
import './Features.scss';
import {Feature} from '../../models/Feature';

interface FeaturesProps {
    createDialog: any;
    features: Feature[];
    openDeleteDialog: any;
    openCreateDialog: any;
    openEditDialog: any;
    googleAuth: any;
}

interface FeaturesState {
    markedSearchBox: boolean;
    search?: string;
    filter?: any;
}

class Features extends React.Component<FeaturesProps, FeaturesState> {

    constructor(props: any) {
        super(props);
        this.state = {
            search: null,
            markedSearchBox: true,
        };
    }

    public render() {

        const {
            openDeleteDialog,
            openCreateDialog,
            openEditDialog,
            googleAuth,
        } = this.props;

        let features = this.sortedFeatures();

        // if(this.state.filter) {
        //     features = this.filterFeatures(features);
        // }

        return (
            <div>
                <Logo />
                <FloatingActionButton className="btn-add-feature" onClick={openCreateDialog}>
                    <ContentAdd />
                </FloatingActionButton>

                <div className={`search-box ${this.state.markedSearchBox ? 'marked' : ''}`}>
                    <div className="standard-text">
                        Hello <strong>{googleAuth.get('username')}</strong>.
                        <ul>
                            <li>You can filter the features by name, description, created by and percentage fields.</li>
                        </ul>
                    </div>
                    <TextField
                        className="search-input"
                        ref="search"
                        floatingLabelText="Search Box:"
                        hintText="Keep calm and enter a Regex"
                        floatingLabelFixed={true}
                        fullWidth={true}
                        onKeyDown={(event) => {
                            if(event.keyCode !== 13) { return; }
                            this.setState({filter: event.target.value})
                        }} />
                </div>

                <div className="features">
                    <Table rowHeight={50}
                            rowsCount={features.length}
                            width={window.innerWidth - 20}
                            height={window.innerHeight - 340}
                            overflowX={'auto'}
                            headerHeight={50}>

                        <Column fixed={true}
                                width={200}
                                header={<Cell className="standard-text">Name</Cell>}
                                flexGrow={3}
                                cell={({rowIndex}) => ( <Cell className="standard-text"> {features[rowIndex].name} </Cell> )} />

                        <Column fixed={true}
                                width={200}
                                header={<Cell className="standard-text">Description</Cell>}
                                flexGrow={4}
                                cell={({rowIndex}) => (
                                    <Cell className="description standard-text">
                                        {features[rowIndex].description}
                                    </Cell>
                                )}/>

                        <Column fixed={true}
                                width={150}
                                flexGrow={2}
                                header={<Cell className="standard-text">Created By</Cell>}
                                cell={({rowIndex}) => (
                                    <Cell className="standard-text">
                                        {features[rowIndex].author}
                                        <br />
                                        {features[rowIndex].authorMail}
                                    </Cell>
                                )}/>

                        <Column fixed={true}
                                width={80}
                                header={<Cell className="standard-text">History</Cell>}
                                className="history"
                                cell={({rowIndex}) => (
                                    <Cell>
                                        <IconMenu
                                            maxHeight={300}
                                            width={500}
                                            useLayerForClickAway={true}
                                            iconButtonElement={<IconButton disabled={!features[rowIndex].history.length} iconStyle={{color: amber500}}> <FontIcon
                                            className="material-icons">history</FontIcon></IconButton>}>
                                            { features[rowIndex].history.reverse().map((record) =>
                                                <MenuItem key={record.updated_at} primaryText={
                                                    <div className="history">
                                                        <small>{record.author}</small>
                                                        <small>{record.percentage}%</small>
                                                        <small>{moment(record.updated_at).fromNow()}</small>
                                                    </div>
                                                } />) }

                                        </IconMenu>
                                    </Cell>
                                )}/>

                        <Column fixed={true}
                                width={80}
                                header={<Cell className="standard-text">Users</Cell>}
                                cell={({rowIndex}) => (
                                    <Cell>
                                        {<IconMenu
                                            maxHeight={300}
                                            width={100}
                                            useLayerForClickAway={true}
                                            iconButtonElement={<IconButton disabled={!features[rowIndex].users.length} iconStyle={{color: green500}}> <FontIcon
                                                className="material-icons">supervisor_account</FontIcon></IconButton>}>
                                            {
                                                features[rowIndex].users.length ?

                                                    features[rowIndex].users.map((user) => <MenuItem key={`${features[rowIndex].name}_${user}`} value={1}
                                                                                                                primaryText={user}/>) :
                                                    <MenuItem primaryText={"No users"}/>
                                            }
                                        </IconMenu>}
                                    </Cell>
                                )} />


                        <Column fixed={true}
                                width={100}
                                header={<Cell className="standard-text">Percentage</Cell>}
                                cell={({rowIndex}) => (
                                    <Cell>
                                        <strong className="percentage standard-text">
                                            {features[rowIndex].percentage + '%'}
                                        </strong>
                                    </Cell>
                                )}/>

                        <Column fixed={true}
                                width={200}
                                header={<Cell className="standard-text">Updated At</Cell>}
                                cell={({rowIndex}) => {
                                    const updatedAt = features[rowIndex].getUpdatedAt();
                                    if (!updatedAt) { return; }

                                    return (
                                        <Cell className="standard-text">
                                            {updatedAt.fromNow()}
                                        </Cell>
                                    )}}
                        />

                        <Column fixed={true}
                                width={80}
                                header={<Cell className="standard-text">Actions</Cell>}
                                cell={({rowIndex}) => {
                                    const featureName = features[rowIndex].name;

                                    return (<Cell>
                                        <IconMenu
                                            maxHeight={300}
                                            width={100}
                                            useLayerForClickAway={true}
                                            iconButtonElement={<IconButton iconStyle={{color: blueGrey500}}> <FontIcon className="material-icons">settings</FontIcon></IconButton>}>

                                            <MenuItem primaryText="EDIT"
                                                        onClick={() => {
                                                            openEditDialog(features[rowIndex]);
                                                        }}
                                                        onKeyDown={(event) => {
                                                            if (event.keyCode != 13) { return; }
                                                            openEditDialog(features[rowIndex]);
                                                        }} />

                                            <MenuItem
                                                primaryText="DELETE"
                                                onKeyDown={(event) => {
                                                    if(event.keyCode != 13) { return; }
                                                    openDeleteDialog(featureName);
                                                }}
                                                onClick={() => {
                                                    openDeleteDialog(featureName);
                                                }} />
                                        </IconMenu>
                                    </Cell>) }}/>
                    </Table>
                </div>
            </div> )
    }
    public componentDidMount() {
        setTimeout(function() {
            this.setState({markedSearchBox : false});
        }.bind(this), 0);
    }

    private sortedFeatures() {
        const features = this.props.features;

        return features.sort((a, b) => {

            const lastRecordA = a.getUpdatedAt();
            const lastRecordB = b.getUpdatedAt();

            if (!lastRecordA && !lastRecordB) {
                return 0;
            } else if (!lastRecordA) {
                return 1;
            } else if (!lastRecordB) {
                return -1;
            }

            return  moment(lastRecordA).isBefore(lastRecordB) ? 1 : -1;
        });
    }

    // private filterFeatures(features: any) {
    //     return features.filter((f: any) => {
    //         const regex = new RegExp(this.state.filter, 'gi');
    //         return (f.get('name') || '').match(regex) ||
    //             (f.get('description') || '').match(regex) ||
    //             (f.get('author') || '').match(regex) ||
    //             (f.get('author_mail') || '').match(regex) ||
    //             (f.get('percentage') != undefined ? f.get('percentage') : '').toString().match(regex);
    //     })
    // }
}

export default Features;