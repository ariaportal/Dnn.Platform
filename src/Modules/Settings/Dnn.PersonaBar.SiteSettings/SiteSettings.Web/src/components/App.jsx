import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Button from "dnn-button";
import SocialPanelHeader from "dnn-social-panel-header";
import {
    visiblePanel as VisiblePanelActions
} from "../actions";
import Body from "./body";
import PersonaBarPage from "dnn-persona-bar-page";
import HtmlEditorManager from "./moreSettings/htmlEditorManager";
import LanguageVerifier from "./languageSettings/languageVerifier";
import LanguagePack from "./languageSettings/languagePack";
import EditLanguagePanel from "./editLanguagePanel";
import resx from "../resources";
require('es6-object-assign').polyfill();
require('array.prototype.find').shim();
require('array.prototype.findindex').shim();

class App extends Component {
    constructor() {
        super();
    }

    openHtmlEditorManager() {
        const {props} = this;
        props.dispatch(VisiblePanelActions.selectPanel(1));
    }

    closeHtmlEditorManager() {
        const {props} = this;
        props.dispatch(VisiblePanelActions.selectPanel(0));
    }

    openLanguageVerifier() {
        const {props} = this;
        props.dispatch(VisiblePanelActions.selectPanel(2));
    }

    closeLanguageVerifier() {
        const {props} = this;
        props.dispatch(VisiblePanelActions.selectPanel(0));
    }

    closeLanguageEditor(){
        const {props} = this;
        props.dispatch(VisiblePanelActions.selectPanel(0));
    }

    openLanguagePack() {
        const {props} = this;
        props.dispatch(VisiblePanelActions.selectPanel(4));
    }

    closeLanguagePack(){
        const {props} = this;
        props.dispatch(VisiblePanelActions.selectPanel(0));
    }

    render() {
        const {props} = this;
        return (
            <div className="siteSettings-app">
                <PersonaBarPage isOpen={props.selectedPage === 0}>
                    <SocialPanelHeader title={resx.get("nav_SiteSettings")}>
                    </SocialPanelHeader>
                    <Body
                        portalId={props.portalId}
                        openLanguagePack={this.openLanguagePack.bind(this)}
                        openLanguageVerifier={this.openLanguageVerifier.bind(this)}
                        openHtmlEditorManager={this.openHtmlEditorManager.bind(this)}
                        />
                </PersonaBarPage>
                <PersonaBarPage isOpen={props.selectedPage === 1}>
                    <SocialPanelHeader title={resx.get("nav_SiteSettings")}>
                    </SocialPanelHeader>
                    <HtmlEditorManager portalId={props.portalId} closeHtmlEditorManager={this.closeHtmlEditorManager.bind(this)} />
                </PersonaBarPage>
                <PersonaBarPage isOpen={props.selectedPage === 2}>
                    <SocialPanelHeader title={resx.get("ResourceFileVerifier")}>
                    </SocialPanelHeader>
                    <LanguageVerifier portalId={props.portalId} closeLanguageVerifier={this.closeLanguageVerifier.bind(this)} />
                </PersonaBarPage>
                <PersonaBarPage isOpen={props.selectedPage === 3}>
                    <SocialPanelHeader title={resx.get("LanguageEditor.Header")}/>
                    <EditLanguagePanel backToSiteSettings={this.closeLanguageEditor.bind(this)} />
                </PersonaBarPage>
                <PersonaBarPage isOpen={props.selectedPage === 4}>
                    <SocialPanelHeader title={resx.get("CreateLanguagePack")}/>
                    <LanguagePack closeLanguagePack={this.closeLanguagePack.bind(this)} />
                </PersonaBarPage>
            </div>
        );
    }
}

App.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    selectedPage: PropTypes.number,
    portalId: PropTypes.number
};


function mapStateToProps(state) {
    return {
        selectedPage: state.visiblePanel.selectedPage,
        selectedPageVisibleIndex: state.visiblePanel.selectedPageVisibleIndex
    };
}


export default connect(mapStateToProps)(App);