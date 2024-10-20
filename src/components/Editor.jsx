import React, {useRef, useState} from "react";
import JoditEditor from "jodit-react";

export const Editor = ({setContent, initialContent}) => {
    const editor = useRef(null);
    console.log(initialContent);
    const config = {
        readonly: false,
        height: 500,
        enableDragAndDropFileToEditor: true,
        "uploader": {
            "insertImageAsBase64URI": true
        }
    };
    const handleUpdate = (content) => {
        setContent(content);
    };

    return (
        <div className="App">
            <JoditEditor
                ref={editor}
                value={initialContent}
                config={config}
                onBlur={handleUpdate}
                // onChange={handleUpdate} // Alterado de onBlur para onChange
            />
            <div dangerouslySetInnerHTML={{ __html: initialContent }} />
        </div>
    );
};
