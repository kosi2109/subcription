import React, { Component } from 'react'
import {Editor} from "react-draft-wysiwyg"
import { EditorState } from "draft-js"
// import "./style.css"
import 'draft-js/dist/Draft.css';
export default class Edit extends Component {
    state = {
        editorState : EditorState.createEmpty()
    }

    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        })
    }

    render() {
        const {editorState} = this.state
        return (
            <div>
                <Editor
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    />
            </div>
        )
    }
}

