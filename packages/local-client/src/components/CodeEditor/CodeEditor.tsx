import { useRef } from "react"

import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react"
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

import './CodeEditor.css'

interface CodeEditorProps {
    initialValue: string
    onChange: (value: string | any) => string | any
}

const CodeEditor: React.FunctionComponent<CodeEditorProps> = (props) => {

    const editorRef = useRef<any>()

    const handleOnChange: OnChange = (value) => {
        props.onChange(value);
    }

    const handleEditorDidMount: OnMount = async (editor, _monaco) => {

        editorRef.current = editor

        editor.getModel()?.updateOptions({ tabSize: 2 })

    }

    const onFormatClick = () => {
        const unformatted = editorRef.current.getModel().getValue()

        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '')

        editorRef.current.setValue(formatted)
    }

    return (
        <div className="editor-wrapper">
            <button
                className="button button-format is-primary is-small"
                onClick={onFormatClick}>
                Format
            </button>
            <MonacoEditor
                value={props.initialValue}
                onChange={handleOnChange}
                onMount={handleEditorDidMount}
                language='javascript'
                theme='vs-dark'
                height={'100%'}
                options={{
                    fontSize: 26,
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />
        </div>
    )
}

export default CodeEditor
