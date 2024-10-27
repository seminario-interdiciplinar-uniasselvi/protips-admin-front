import React, {useEffect, useRef, useState} from "react";
import JoditEditor from "jodit-react";

export const Editor = ({setContent, initialContent}) => {
    const editor = useRef(null);
    let editorContent = initialContent;
    const config = {
        readonly: false,
        height: 500,
        enableDragAndDropFileToEditor: true,
        "uploader": {
            "insertImageAsBase64URI": true
        }
    };
    const handleChange = (newContent) => {
        editorContent = newContent;
    };

    const handleBlur = () => {
            setContent(editorContent);
    };


    return (
        <div className="App">
            <JoditEditor
                ref={editor}
                value={initialContent}
                config={config}
                onBlur={handleBlur}
                onChange={handleChange}
            />
        </div>
    );
};
