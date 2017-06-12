import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Logo from '../Logo/';
import * as React from 'react';

export default function FeaturesHeader({floatingButtonAction}) {
    return (
        <div>
            <Logo />
            <FloatingActionButton className="btn-add-feature" onClick={floatingButtonAction}>
                <ContentAdd />
            </FloatingActionButton>
        </div>
    );
};