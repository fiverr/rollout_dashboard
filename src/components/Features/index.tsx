import * as React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import {green500, amber500, blueGrey500 } from 'material-ui/styles/colors';
import * as moment from 'moment';
import {Feature} from '../../models/Feature';
import FeaturesHeader from '../FeaturesHeader/';
import './Features.scss';

interface FeaturesProps {
    createDialog: any;
    features: Feature[];
    openDeleteDialog: any;
    openCreateDialog: any;
    openEditDialog: any;
    googleAuth: any;
    getFeatures: () => {};
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
            features,
        } = this.props;

        let sortedFeatures = this.sortFeatures(features);
        const filter = this.state.filter;

        if (filter) {
            sortedFeatures = this.filterFeatures(sortedFeatures, filter);
        }

        return (
            <div>
                <FeaturesHeader floatingButtonAction={openCreateDialog} />
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
                            this.setState({filter: event.target.value});
                        }} />
                </div>

                <div className="features">
                    <Table rowHeight={50}
                            rowsCount={sortedFeatures.length}
                            width={window.innerWidth - 20}
                            height={window.innerHeight - 340}
                            overflowX={'auto'}
                            headerHeight={50}>

                        <Column fixed={true}
                                width={200}
                                header={<Cell className="standard-text">Name</Cell>}
                                flexGrow={3}
                                cell={({rowIndex}) => ( <Cell className="standard-text"> {sortedFeatures[rowIndex].name} </Cell> )} />

                        <Column fixed={true}
                                width={200}
                                header={<Cell className="standard-text">Description</Cell>}
                                flexGrow={4}
                                cell={({rowIndex}) => (
                                    <Cell className="description standard-text">
                                        {sortedFeatures[rowIndex].description}
                                    </Cell>
                                )}/>

                        <Column fixed={true}
                                width={150}
                                flexGrow={2}
                                header={<Cell className="standard-text">Created By</Cell>}
                                cell={({rowIndex}) => (
                                    <Cell className="standard-text">
                                        {sortedFeatures[rowIndex].author}
                                        <br />
                                        {sortedFeatures[rowIndex].authorMail}
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
                                            iconButtonElement={<IconButton disabled={!sortedFeatures[rowIndex].history.length} iconStyle={{color: amber500}}> <FontIcon
                                            className="material-icons">history</FontIcon></IconButton>}>
                                            { sortedFeatures[rowIndex].history.map((record) =>
                                                <MenuItem key={record.updated_at} title={record.updated_at} primaryText={
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
                                            iconButtonElement={<IconButton disabled={!sortedFeatures[rowIndex].users.length} iconStyle={{color: green500}}> <FontIcon
                                                className="material-icons">supervisor_account</FontIcon></IconButton>}>
                                            {
                                                sortedFeatures[rowIndex].users.length ?

                                                sortedFeatures[rowIndex].users.map((user) => <MenuItem key={`${sortedFeatures[rowIndex].name}_${user}`} value={1}
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
                                            {sortedFeatures[rowIndex].percentage + '%'}
                                        </strong>
                                    </Cell>
                                )}/>

                        <Column fixed={true}
                                width={200}
                                header={<Cell className="standard-text">Updated At</Cell>}
                                cell={({rowIndex}) => {
                                    const updatedAt = sortedFeatures[rowIndex].updatedAt;
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
                                    const featureName = sortedFeatures[rowIndex].name;

                                    return (<Cell>
                                        <IconMenu
                                            maxHeight={300}
                                            width={100}
                                            useLayerForClickAway={true}
                                            iconButtonElement={<IconButton iconStyle={{color: blueGrey500}}> <FontIcon className="material-icons">settings</FontIcon></IconButton>}>

                                            <MenuItem primaryText="EDIT"
                                                        onClick={() => {
                                                            openEditDialog(sortedFeatures[rowIndex]);
                                                        }}
                                                        onKeyDown={(event) => {
                                                            if (event.keyCode != 13) { return; }
                                                            openEditDialog(sortedFeatures[rowIndex]);
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
        this.props.getFeatures();
        
        setTimeout(function() {
            this.setState({markedSearchBox : false});
        }.bind(this), 0);
    }

    private filterFeatures(features: Feature[], pattern: string): Feature[] {
        return Feature.searchByPattern(features, pattern);
    }

    private sortFeatures(features: Feature[]): Feature[] {
        return features.sort(Feature.compareFeaturesByUpdatedAt);
    }
}

export default Features;