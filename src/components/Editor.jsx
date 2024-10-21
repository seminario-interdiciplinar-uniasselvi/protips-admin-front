import React, {useEffect, useRef, useState} from "react";
import JoditEditor from "jodit-react";

export const Editor = ({setContent, initialContent}) => {
    const editor = useRef(null);
    // const [content, setEditorContent] = useState(initialContent);
    let editorContent = initialContent;
    console.log(initialContent);
    const config = {
        readonly: false,
        height: 500,
        enableDragAndDropFileToEditor: true,
        "uploader": {
            "insertImageAsBase64URI": true
        }
    };
    // Atualiza o estado interno enquanto o usuário digita
    const handleChange = (newContent) => {
        console.log(newContent);
        editorContent = newContent;
    };

    // Atualiza o estado do componente pai quando o editor perde o foco, se houver mudança
    const handleBlur = () => {
        // if (content !== initialContent) {
            setContent(editorContent); // Só atualiza se o conteúdo for diferente
        // }
    };

    // Sincroniza o estado local com o initialContent se ele mudar
    // useEffect(() => {
    //     setEditorContent(initialContent);
    // }, [initialContent]);

    return (
        <div className="App">
            <JoditEditor
                ref={editor}
                value={initialContent}
                config={config}
                onBlur={handleBlur}
                onChange={handleChange} // Alterado de onBlur para onChange
            />
            {/*<div dangerouslySetInnerHTML={{ __html: initialContent }} />*/}
        </div>
    );
};
